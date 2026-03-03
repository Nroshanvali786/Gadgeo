package com.example.demo.admin;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.products.Category;
import com.example.demo.products.CategoryRepository;
import com.example.demo.products.Product;
import com.example.demo.products.ProductImage;
import com.example.demo.products.ProductRepository;
import com.example.demo.products.ProductimageRepository;

@Service
public class AdminService {

    private final ProductRepository productRepository;
    private final ProductimageRepository productImageRepository;
    private final CategoryRepository categoryRepository;

    public AdminService(ProductRepository productRepository,
                               ProductimageRepository productImageRepository,
                               CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.categoryRepository = categoryRepository;
    }

    public Product addProductWithImage(String name, String description,
                                       Double price, Integer stock,
                                       Integer categoryId, String imageUrl) {

        Optional<Category> category = categoryRepository.findById(categoryId);

        if (category.isEmpty()) {
            throw new IllegalArgumentException("Invalid category ID");
        }

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(BigDecimal.valueOf(price));
        product.setStock(stock);
        product.setCategory(category.get());
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        Product savedProduct = productRepository.save(product);

        if (imageUrl != null && !imageUrl.isEmpty()) {
            ProductImage productImage = new ProductImage();
            productImage.setProduct(savedProduct);
            productImage.setImageUrl(imageUrl);
            productImageRepository.save(productImage);
        } else {
            throw new IllegalArgumentException("Product image URL cannot be empty");
        }

        return savedProduct;
    }

    public void deleteProduct(Integer productId) {

        if (!productRepository.existsById(productId)) {
            throw new IllegalArgumentException("Product not found");
        }

        productImageRepository.deleteByProductId(productId);
        productRepository.deleteById(productId);
    }
}