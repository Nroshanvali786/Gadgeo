package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public interface LoginService {
	
	@Autowired
	boolean validateUser(String email, String password);
	
	Login save(Login login);
	
	String generateToken(Login login) ;
	
	String generateNewToken(Login login);
	
	boolean validateToken(String token);
	
	String extractUsername(String token);
	String validateTokenAndGetEmail(String token);
}
