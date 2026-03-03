package com.example.demo;


import java.time.LocalDateTime;

//import com.example.demo.Login;

//import org.apache.catalina.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "jwtTokens")
public class JWTEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer tokenId; 

    @ManyToOne 
    @JoinColumn(name = "user_id", nullable = false, unique = true) 
    private Login user; 

    @Column(nullable = false) 
    private String token; 

    @Column(nullable = false) 
    private LocalDateTime expiresAt; 
    
    

    public JWTEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public JWTEntity(Integer tokenId, Login user, String token, LocalDateTime expiresAt) {
        super();
        this.tokenId = tokenId;
        this.user = user;
        this.token = token;
        this.expiresAt = expiresAt;
    }

    public JWTEntity(Login user, String token, LocalDateTime expiresAt) {
        super();
        this.user = user;
        this.token = token;
        this.expiresAt = expiresAt;
    }

	public Integer getTokenId() {
		return tokenId;
	}

	public void setTokenId(Integer tokenId) {
		this.tokenId = tokenId;
	}

	public Login getUser() {
		return user;
	}

	public void setUser(Login user) {
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public LocalDateTime getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(LocalDateTime expiresAt) {
		this.expiresAt = expiresAt;
	}

    // Getters and setters
    
}