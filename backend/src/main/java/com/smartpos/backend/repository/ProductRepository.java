package com.smartpos.backend.repository;

import com.smartpos.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // LOW STOCK PRODUCTS COUNT
    @Query("SELECT COUNT(p) FROM Product p WHERE p.quantity < 5")
    Long countLowStockProducts();
}