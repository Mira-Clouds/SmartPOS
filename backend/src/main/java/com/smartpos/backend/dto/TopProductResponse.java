package com.smartpos.backend.dto;

public class TopProductResponse {

    private String productName;
    private Long totalQuantity;
    private Double totalSales;

    public TopProductResponse() {
    }

    public TopProductResponse(String productName, Long totalQuantity, Double totalSales) {
        this.productName = productName;
        this.totalQuantity = totalQuantity;
        this.totalSales = totalSales;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Double totalSales) {
        this.totalSales = totalSales;
    }
}