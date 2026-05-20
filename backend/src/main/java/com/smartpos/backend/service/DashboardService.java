package com.smartpos.backend.service;

import com.smartpos.backend.dto.DashboardResponse;
import com.smartpos.backend.repository.BillRepository;
import com.smartpos.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ProductRepository productRepository;

    public DashboardResponse getDashboardData() {

        // TOTAL SALES
        Double totalSales = billRepository.getTotalSales();

        // IF NO SALES
        if (totalSales == null) {
            totalSales = 0.0;
        }

        // TOTAL BILLS
        Long totalBills = billRepository.count();

        // TOTAL PRODUCTS
        Long totalProducts = productRepository.count();

        // LOW STOCK PRODUCTS
        Long lowStockProducts =
                productRepository.countLowStockProducts();

        return new DashboardResponse(
                totalSales,
                totalBills,
                totalProducts,
                lowStockProducts
        );
    }
}