package com.example.demo.cart;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Login;
import com.example.demo.products.Product;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {

    List<Cart> findByUser(Login user);

    Optional<Cart> findByUserAndProduct(Login user, Product product);
    
    @Query("SELECT c FROM Cart c JOIN FETCH c.product WHERE c.user.id = :userId")
    List<Cart> findCartItemsWithProductDetails(int userId);
    
    @Modifying
    @Query("DELETE FROM Cart c WHERE c.user.id = :userId")
    void deleteAllCartItemsByUserId(int userId);
}