package com.example.demo.logout;

import org.springframework.stereotype.Service;

import com.example.demo.JWTEntity;
import com.example.demo.JWTRepo;
import com.example.demo.Login;

@Service
public class LogoutService {

    private final JWTRepo jwtTokenRepository;

    public LogoutService(JWTRepo jwtTokenRepository) {
        this.jwtTokenRepository = jwtTokenRepository;
    }

    public void logout(Login user) {

        int userId = user.getId();

        // Retrieve the JWT token associated with the user
        JWTEntity token = jwtTokenRepository.findByUserId(userId);

        // If a token exists, delete it from the repository
        if (token != null) {
            jwtTokenRepository.deleteByUserId(userId);
        }
    }
}