package com.smartpos.backend.service;

import com.smartpos.backend.dto.DailySalesResponse;
import com.smartpos.backend.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DailySalesService {

    @Autowired
    private BillRepository billRepository;

    public DailySalesResponse getTodaySales() {

        Double totalSales = billRepository.getTodaySales();
        Long totalBills = billRepository.getTodayBills();

        // NULL safety
        if (totalSales == null) {
            totalSales = 0.0;
        }

        if (totalBills == null) {
            totalBills = 0L;
        }

        return new DailySalesResponse(
                LocalDate.now(),
                totalSales,
                totalBills
        );
    }
}