package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Component
public class LoginServiceImplementation implements LoginService {

    @Autowired
    private JWTRepo jwtTokenRepository;

    private LoginRepo loginRepo;
    
    private static final String SECRET =
            "my-super-secret-key-my-super-secret-key-my-super-secret-key-1234567890";


    public LoginServiceImplementation(LoginRepo loginRepo) {
        this.loginRepo = loginRepo;
    }

    // ✅ Validate user WITHOUT password encoder
    @Override
    public boolean validateUser(String email, String password) {

        Optional<Login> optionalUser = loginRepo.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return false;
        }

        Login user = optionalUser.get();

        // Direct password comparison (NOT secure)
        return user.getPassword().equals(password);
    }

    @Override
    public Login save(Login login) {
        return loginRepo.save(login);
    }

    @Override
    public String generateToken(Login user) {

        String token;
        LocalDateTime now = LocalDateTime.now();

        JWTEntity existingToken =
                jwtTokenRepository.findByUserId(user.getId());

        if (existingToken != null &&
                now.isBefore(existingToken.getExpiresAt())) {

            token = existingToken.getToken();
        } else {

            token = generateNewToken(user);

            if (existingToken != null) {
                jwtTokenRepository.delete(existingToken);
            }

            saveToken(user, token);
        }

        return token;
    }

    public String generateNewToken(Login user) {

//        SecretKey secretKey =
//                Keys.secretKeyFor(SignatureAlgorithm.HS512);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 3600000))
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()),SignatureAlgorithm.HS512)
                .compact();
    }

    public void saveToken(Login user, String token) {

        JWTEntity jwtToken =
                new JWTEntity(user, token,
                        LocalDateTime.now().plusHours(1));

        jwtTokenRepository.save(jwtToken);
    }
    @Override
    public boolean validateToken(String token) {
//    	private static final String SECRET =
//    	        "my-super-secret-key-my-super-secret-key-my-super-secret-key";

        try {
//        	SecretKey secretKey =
//                    Keys.secretKeyFor(SignatureAlgorithm.HS512);
            System.err.println("VALIDATING TOKEN...");

            // Parse and validate the JWT signature
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes()))
                    .build()
                    .parseClaimsJws(token);

            // Check if token exists in database and is not expired
            Optional<JWTEntity> jwtToken = jwtTokenRepository.findByToken(token);

            if (jwtToken.isPresent()) {
                System.err.println("Token Expiry: " + jwtToken.get().getExpiresAt());
                System.err.println("Current Time: " + LocalDateTime.now());

                return jwtToken.get()
                        .getExpiresAt()
                        .isAfter(LocalDateTime.now());
            }

            return false;

        } catch (Exception e) {
            System.err.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }
    @Override
    public String extractUsername(String token) {
//    	SecretKey secretKey =
//                Keys.secretKeyFor(SignatureAlgorithm.HS512);
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    @Override
    public String validateTokenAndGetEmail(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

}
