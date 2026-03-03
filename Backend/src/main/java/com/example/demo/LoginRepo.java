package com.example.demo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LoginRepo extends JpaRepository<Login, Integer> {
	Optional<Login> findByEmail(String email);
}
