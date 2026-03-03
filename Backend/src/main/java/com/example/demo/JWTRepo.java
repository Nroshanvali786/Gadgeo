package com.example.demo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

public interface JWTRepo extends JpaRepository<JWTEntity, Integer> {
	@Query("SELECT t FROM JWTEntity t WHERE t.user.id = :userId")
    JWTEntity findByUserId(@Param("userId") int userId);
	Optional<JWTEntity> findByToken(String token);
	
	@Modifying
    @Transactional
    @Query("DELETE FROM JWTEntity t WHERE t.user.id = :userId")
    void deleteByUserId(@Param("userId") int userId);
}
