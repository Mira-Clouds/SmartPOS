package com.smartpos.backend.dto;

import java.time.LocalDate;

public class MonthlySalesResponse {

    private String month;
    private Double totalSales;
    private Long totalBills;

    public MonthlySalesResponse() {
    }

    public MonthlySalesResponse(String month, Double totalSales, Long totalBills) {
        this.month = month;
        this.totalSales = totalSales;
        this.totalBills = totalBills;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
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