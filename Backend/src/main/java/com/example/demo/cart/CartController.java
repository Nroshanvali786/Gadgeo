package com.example.demo.cart;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.*;
//import com.example.demo.repository.LoginRepository;
//import com.example.demo.service.CartService;


import java.util.List;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;

    // ➕ Add To Cart
    @PostMapping("/add/{productId}")
    public Cart addToCart(@PathVariable Integer productId,
                          HttpServletRequest request) {

        Login user = (Login) request.getAttribute("authenticatedUser");

        return cartService.addToCart(user.getId(), productId);
    }

    // 📦 Get Cart
    @GetMapping
    public List<Cart> getCart(HttpServletRequest request) {

        Login user = (Login) request.getAttribute("authenticatedUser");

        return cartService.getUserCart(user.getId());
    }

    // ❌ Remove
    @DeleteMapping("/{id}")
    public void removeItem(@PathVariable Integer id) {
        cartService.removeItem(id);
    }

    // 🔄 Update
    @PutMapping("/{id}")
    public Cart updateQuantity(@PathVariable Integer id,
                               @RequestParam int quantity) {
        return cartService.updateQuantity(id, quantity);
    }
}