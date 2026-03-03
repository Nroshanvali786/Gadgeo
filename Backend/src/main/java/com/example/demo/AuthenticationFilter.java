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

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Component;

@WebFilter(urlPatterns = {"/api/*", "/admin/*"})
@Component
public class AuthenticationFilter implements Filter {

//    private static final Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);

    private final LoginService authService;
    private final LoginRepo userRepository;

    private static final String ALLOWED_ORIGIN = "http://localhost:5173", "https://gadgeo-ktfjs5omh-nroshanvali786s-projects.vercel.app";

    private static final String[] UNAUTHENTICATED_PATHS = {
            "/api/signup",
            "/api/login",
            "/api/products"
    };

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
        System.out.println("REQUEST URI: " + requestURI);

        // Always set CORS
        setCORSHeaders(httpResponse);

        // Handle OPTIONS request
        if (httpRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
            httpResponse.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // ✅ PUBLIC ENDPOINTS
        if (requestURI.startsWith("/api/signup") ||
        	    requestURI.startsWith("/api/login") ||
        	    requestURI.startsWith("/api/products") ||
        	    requestURI.startsWith("/images")) {

        	    chain.doFilter(request, response);
        	    return;
        }


        // 🔐 PROTECTED ENDPOINTS BELOW

        String token = getAuthTokenFromCookies(httpRequest);

        if (token == null || !authService.validateToken(token)) {
            sendErrorResponse(httpResponse,
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized: Invalid or missing token");
            return;
        }

        String email = authService.extractUsername(token);
        Optional<Login> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            sendErrorResponse(httpResponse,
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized: User not found");
            return;
        }

        Login authenticatedUser = userOptional.get();

        // 🔐 Protect Admin endpoints only
        if (requestURI.startsWith("/admin") &&
                !authenticatedUser.getRole().equals("ADMIN")) {

            sendErrorResponse(httpResponse,
                    HttpServletResponse.SC_FORBIDDEN,
                    "Forbidden: Admin access required");
            return;
        }

        // 🔐 Protect Cart endpoints only
        if (requestURI.startsWith("/api/cart") &&
                !(authenticatedUser.getRole().equals("CUSTOMER") ||
                  authenticatedUser.getRole().equals("ADMIN") ||
                  authenticatedUser.getRole().equals("VENDOR"))) {

            sendErrorResponse(httpResponse,
                    HttpServletResponse.SC_FORBIDDEN,
                    "Forbidden: Access denied");
            return;
        }

        httpRequest.setAttribute("authenticatedUser", authenticatedUser);

        chain.doFilter(request, response);
    }


    private void setCORSHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
//        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void sendErrorResponse(HttpServletResponse response,
                                   int statusCode,
                                   String message) throws IOException {

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
