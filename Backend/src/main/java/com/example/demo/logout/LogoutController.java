package com.example.demo.logout;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Login;
import com.example.demo.LoginService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(
    originPatterns = {
        "http://localhost:5173",
        "https://*.vercel.app"
    },
    allowCredentials = "true"
)
@RequestMapping("/api")
public class LogoutController {

    private final LogoutService authService;

    public LogoutController(LogoutService authService) {
        this.authService = authService;
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(
            HttpServletRequest request,
            HttpServletResponse response) {

        try {
            // Retrieve authenticated user from request
            Login user = (Login) request.getAttribute("authenticatedUser");

            // Delegate logout operation to service layer
            if (user != null) {
                // Call service properly
                authService.logout(user);
            }

            // Clear authentication token cookie
            Cookie cookie = new Cookie("authToken", null);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0);
            cookie.setPath("/");
            response.addCookie(cookie);

            // Success response
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Logout successful");

            return ResponseEntity.ok(responseBody);

        } catch (RuntimeException e) {
            // Error response
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Logout failed");

            return ResponseEntity
                    .status(500)
                    .body(errorResponse);
        }
    }
}
