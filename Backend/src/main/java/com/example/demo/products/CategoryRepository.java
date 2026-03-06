package com.example.demo.products;

import java.util.List;
import java.util.Optional;

//package com.example.demo.products;

//import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    // Optional<Category> findByCategoryName(String categoryName);

    Optional<Category> findByCategoryNameIgnoreCase(String categoryName);
    

}

