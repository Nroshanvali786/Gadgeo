package com.example.demo.cart;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.*;
import com.example.demo.products.*;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private LoginRepo loginRepo;

    @Autowired
    private ProductRepository productRepo;

    // ➕ Add to Cart
    public Cart addToCart(Integer userId, Integer productId) {

        Login user = loginRepo.findById(userId).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();

        var existing = cartRepo.findByUserAndProduct(user, product);

        if (existing.isPresent()) {
            Cart item = existing.get();
            item.setQuantity(item.getQuantity() + 1);
            return cartRepo.save(item);
        }

        Cart newItem = new Cart();
        newItem.setUser(user);
        newItem.setProduct(product);
        newItem.setQuantity(1);

        return cartRepo.save(newItem);
    }

    // 📦 Get Cart
    public List<Cart> getUserCart(Integer userId) {
        Login user = loginRepo.findById(userId).orElseThrow();
        return cartRepo.findByUser(user);
    }

    // ❌ Remove
    public void removeItem(Integer id) {
        cartRepo.deleteById(id);
    }

    // 🔄 Update Quantity
    public Cart updateQuantity(Integer id, int quantity) {
        Cart item = cartRepo.findById(id).orElseThrow();
        item.setQuantity(quantity);
        return cartRepo.save(item);
    }
}