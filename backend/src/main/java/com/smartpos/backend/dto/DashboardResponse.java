package com.smartpos.backend.dto;

public class DashboardResponse {

    private Double totalSales;
    private Long totalBills;
    private Long totalProducts;
    private Long lowStockProducts;

    public DashboardResponse() {
    }

    public DashboardResponse(
            Double totalSales,
            Long totalBills,
            Long totalProducts,
            Long lowStockProducts
    ) {
        this.totalSales = totalSales;
        this.totalBills = totalBills;
        this.totalProducts = totalProducts;
        this.lowStockProducts = lowStockProducts;
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

    public Long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(Long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public Long getLowStockProducts() {
        return lowStockProducts;
    }

    public void setLowStockProducts(Long lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }
}