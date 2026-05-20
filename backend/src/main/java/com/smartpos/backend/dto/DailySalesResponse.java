package com.smartpos.backend.dto;

import java.time.LocalDate;

public class DailySalesResponse {

    private LocalDate date;
    private Double totalSales;
    private Long totalBills;

    public DailySalesResponse() {
    }

    public DailySalesResponse(
            LocalDate date,
            Double totalSales,
            Long totalBills
    ) {
        this.date = date;
        this.totalSales = totalSales;
        this.totalBills = totalBills;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Double totalSales) {
        this.totalSales = totalSales;
    }

    public Long getTotalBills() {
        return totalBills;
    }

    public void setTotalBills(Long totalBills) {
        this.totalBills = totalBills;
    }
}