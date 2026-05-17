package com.smartpos.backend.service;

import com.smartpos.backend.entity.Bill;
import com.smartpos.backend.entity.BillItem;
import com.smartpos.backend.entity.Product;
import com.smartpos.backend.repository.BillRepository;
import com.smartpos.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ProductRepository productRepository;

    public Bill saveBill(Bill bill) {

        // Loop through bill items
        for (BillItem item : bill.getBillItems()) {

            Product product = productRepository.findById(
                    item.getProduct().getId()
            ).orElseThrow(() -> new RuntimeException("Product not found"));

            // Reduce stock quantity
            product.setQuantity(
                    product.getQuantity() - item.getQuantity()
            );

            productRepository.save(product);

            // Set product price to bill item
            item.setPrice(product.getPrice());

            // Connect bill with bill item
            item.setBill(bill);
        }

        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }
}