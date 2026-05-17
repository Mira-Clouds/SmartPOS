package com.smartpos.backend.service;

import com.smartpos.backend.entity.Bill;
import com.smartpos.backend.entity.BillItem;
import com.smartpos.backend.entity.Product;
import com.smartpos.backend.repository.BillRepository;
import com.smartpos.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ProductRepository productRepository;

    public Bill saveBill(Bill bill) {

        double total = 0;

        // LOOP THROUGH ITEMS
        for (BillItem item : bill.getItems()) {

            Product product = productRepository.findById(
                    item.getProduct().getId()
            ).orElseThrow(() -> new RuntimeException("Product not found"));

            // CHECK STOCK
            if (product.getQuantity() < item.getQuantity()) {
                throw new RuntimeException(
                        "Not enough stock for " + product.getName()
                );
            }

            // REDUCE STOCK
            product.setQuantity(
                    product.getQuantity() - item.getQuantity()
            );

            productRepository.save(product);

            // ITEM TOTAL
            item.setPrice(product.getPrice() * item.getQuantity());

            // ADD TO BILL TOTAL
            total += item.getPrice();

            // CONNECT BILL
            item.setBill(bill);
        }

        bill.setTotalAmount(total);

        bill.setBillDate(LocalDateTime.now());

        return billRepository.save(bill);
    }
}