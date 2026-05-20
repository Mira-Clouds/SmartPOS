package com.smartpos.backend.service;

import com.smartpos.backend.dto.MonthlySalesResponse;
import com.smartpos.backend.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MonthlySalesService {

    @Autowired
    private BillRepository billRepository;

    public MonthlySalesResponse getMonthlySales() {

        Double totalSales = billRepository.getMonthlySales();
        Long totalBills = billRepository.getMonthlyBills();

        // NULL safety
        if (totalSales == null) {
            totalSales = 0.0;
        }

        if (totalBills == null) {
            totalBills = 0L;
        }

        String month = LocalDate.now().getYear()
                + "-" +
                String.format("%02d", LocalDate.now().getMonthValue());

        return new MonthlySalesResponse(
                month,
                totalSales,
                totalBills
        );
    }
}