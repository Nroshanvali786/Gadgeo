package com.example.demo;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(
    originPatterns = {
        "http://localhost:5173",
        "https://*.vercel.app",
        "https://*.onrender.com"
    },
    allowCredentials = "true"
)

@RequestMapping("/api")
public class LoginController {

    @Autowired
    LoginRepo loginRepo;

    @Autowired
    LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    // ✅ SIGNUP (No password encoding)
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Login login) {

        if (loginRepo.findByEmail(login.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email already registered"));
        }

        // Directly save password (plain text)
        Login savedUser = loginService.save(login);

        return ResponseEntity.ok(
                Map.of(
                        "message", "User registered successfully",
                        "email", savedUser.getEmail()
                )
        );
    }

    // ✅ LOGIN (Direct password comparison)
    @PostMapping("/login")
    public ResponseEntity<?> userLogin(
            @RequestBody Map<String, String> data,
            HttpServletResponse response, HttpServletRequest request) {

        String email = data.get("email");
        String password = data.get("password");
//        String role = data.get("role");

        Optional<Login> optionalUser = loginRepo.findByEmail(email);

        // Check if user exists
        if (optionalUser.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Invalid credentials"));
        }

        Login user = optionalUser.get();

        // Direct password comparison
        if (!user.getPassword().equals(password)) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Invalid credentials"));
        }
//        request.getSession().setAttribute("authenticatedUser", user);

        // Generate token
        String token = loginService.generateToken(user);

        // Create cookie
        response.setHeader(
            "Set-Cookie",
            "authToken=" + token +
            "; Max-Age=3600" +
            "; Path=/" +
            "; HttpOnly" +
            "; SameSite=None" +
            "; Secure"
        );



        return ResponseEntity.ok(
                Map.of(
                        "message", "User Successfully Logged In.",
                        "email", email,
                        "role", user.getRole()
                )
        );
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {

        // Get cookies
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = null;

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("authToken")) {
                token = cookie.getValue();
            }
        }

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            // Validate token and extract email
            String email = loginService.validateTokenAndGetEmail(token);

            Optional<Login> user = loginRepo.findByEmail(email);

            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            return ResponseEntity.ok(
                    Map.of(
                            "email", user.get().getEmail()
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
}
