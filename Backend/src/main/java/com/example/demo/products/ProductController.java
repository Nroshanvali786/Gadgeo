package com.example.demo.products;


//import com.example.demo.entity.Product;
import com.example.demo.Login;
//import com.example.demo.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173", "https://gadgeo-ktfjs5omh-nroshanvali786s-projects.vercel.app", allowCredentials = "true")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getProducts(
            @RequestParam(required = false) String category,
            HttpServletRequest request) {

        try {
            // Get authenticated user from filter
            Login authenticatedUser =
                    (Login) request.getAttribute("authenticatedUser");
            System.out.println(authenticatedUser);


            // Get products
            List<Product> products =
                    productService.getProductsByCategory(category);

            Map<String, Object> response = new HashMap<>();

            // User info
            if (authenticatedUser != null) {
                Map<String, String> userInfo = new HashMap<>();
                userInfo.put("email", authenticatedUser.getEmail());
                userInfo.put("role", authenticatedUser.getRole());
                response.put("user", userInfo);
            }


            // Product list
            List<Map<String, Object>> productList = new ArrayList<>();

            for (Product product : products) {

                Map<String, Object> productDetails = new HashMap<>();

                productDetails.put("productId", product.getProductId());
                productDetails.put("name", product.getName());
                productDetails.put("description", product.getDescription());
                productDetails.put("price", product.getPrice());
                productDetails.put("stock", product.getStock());

                // Fetch product images
                List<String> images =
                        productService.getProductImages(
                                product.getProductId());

                productDetails.put("images", images);

                productList.add(productDetails);
            }

            response.put("products", productList);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
