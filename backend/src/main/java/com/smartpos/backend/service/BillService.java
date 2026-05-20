package com.smartpos.backend.service;

import com.smartpos.backend.entity.Bill;
import com.smartpos.backend.entity.BillItem;
import com.smartpos.backend.entity.Product;
import com.smartpos.backend.repository.BillRepository;
import com.smartpos.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ProductRepository productRepository;

    public Bill saveBill(Bill bill) {

        double total = 0;

        bill.setBillDate(LocalDateTime.now());

        for (BillItem item : bill.getBillItems()) {

            Product product = productRepository.findById(
                    item.getProduct().getId()
            ).orElseThrow(() -> new RuntimeException("Product not found"));

            // CHECK STOCK
            if (product.getQuantity() < item.getQuantity()) {
                throw new RuntimeException(
                        product.getName() + " stock is not enough"
                );
            }

            // REDUCE STOCK
            product.setQuantity(
                    product.getQuantity() - item.getQuantity()
            );

            productRepository.save(product);

            // SET PRICE
            item.setPrice(product.getPrice());

            // CALCULATE SUBTOTAL
            double subtotal =
                    product.getPrice() * item.getQuantity();

            item.setSubtotal(subtotal);

            // ADD TO BILL TOTAL
            total += subtotal;

            // CONNECT BILL
            item.setBill(bill);
        }

        // FINAL BILL TOTAL
        bill.setTotalAmount(total);

        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Bill getBillById(Long id) {
        return billRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Bill not found"));
    }
}