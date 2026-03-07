package com.example.demo;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.stereotype.Component;

@WebFilter(urlPatterns = {"/api/*", "/admin/*"})
@Component
public class AuthenticationFilter implements Filter {

    private final LoginService authService;
    private final LoginRepo userRepository;

    public AuthenticationFilter(LoginService authService, LoginRepo userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String requestURI = httpRequest.getRequestURI();
        String origin = httpRequest.getHeader("Origin");

        // ✅ Handle CORS preflight request
        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {

            if (origin != null) {
                httpResponse.setHeader("Access-Control-Allow-Origin", origin);
            }

            httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
            httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

            httpResponse.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // ✅ Public endpoints
        if (requestURI.startsWith("/api/signup") ||
            requestURI.startsWith("/api/login") ||
            requestURI.startsWith("/api/products") ||
            requestURI.startsWith("/api/me") ||
            requestURI.startsWith("/images")) {

            chain.doFilter(request, response);
            return;
        }

        // 🔐 Protected endpoints

        String token = getAuthTokenFromCookies(httpRequest);

        if (token == null || !authService.validateToken(token)) {
            sendErrorResponse(httpRequest, httpResponse,
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized: Invalid or missing token");
            return;
        }

        String email = authService.extractUsername(token);
        Optional<Login> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            sendErrorResponse(httpRequest, httpResponse,
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized: User not found");
            return;
        }

        Login authenticatedUser = userOptional.get();

        // 🔐 Admin protection
        if (requestURI.startsWith("/admin") &&
                !authenticatedUser.getRole().equals("ADMIN")) {

            sendErrorResponse(httpRequest, httpResponse,
                    HttpServletResponse.SC_FORBIDDEN,
                    "Forbidden: Admin access required");
            return;
        }

        // 🔐 Cart protection
        if (requestURI.startsWith("/api/cart") &&
                !(authenticatedUser.getRole().equals("CUSTOMER") ||
                  authenticatedUser.getRole().equals("ADMIN") ||
                  authenticatedUser.getRole().equals("VENDOR"))) {

            sendErrorResponse(httpRequest, httpResponse,
                    HttpServletResponse.SC_FORBIDDEN,
                    "Forbidden: Access denied");
            return;
        }

        httpRequest.setAttribute("authenticatedUser", authenticatedUser);

        chain.doFilter(request, response);
    }

    private void sendErrorResponse(HttpServletRequest request,
                                   HttpServletResponse response,
                                   int statusCode,
                                   String message) throws IOException {

        String origin = request.getHeader("Origin");

        if (origin != null) {
            response.setHeader("Access-Control-Allow-Origin", origin);
        }

        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        response.setStatus(statusCode);
        response.getWriter().write(message);
    }

    private String getAuthTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            return Arrays.stream(cookies)
                    .filter(cookie -> "authToken".equals(cookie.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);
        }

        return null;
    }
}
