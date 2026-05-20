package com.smartpos.backend.repository;

import com.smartpos.backend.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BillRepository extends JpaRepository<Bill, Long> {

    // TOTAL SALES
    @Query("SELECT SUM(b.totalAmount) FROM Bill b")
    Double getTotalSales();

    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Bill b WHERE DATE(b.billDate) = CURRENT_DATE")
    Double getTodaySales();

    @Query("SELECT COUNT(b) FROM Bill b WHERE DATE(b.billDate) = CURRENT_DATE")
    Long getTodayBills();

    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Bill b WHERE YEAR(b.billDate) = YEAR(CURRENT_DATE) AND MONTH(b.billDate) = MONTH(CURRENT_DATE)")
    Double getMonthlySales();

    @Query("SELECT COUNT(b) FROM Bill b WHERE YEAR(b.billDate) = YEAR(CURRENT_DATE) AND MONTH(b.billDate) = MONTH(CURRENT_DATE)")
    Long getMonthlyBills();
}