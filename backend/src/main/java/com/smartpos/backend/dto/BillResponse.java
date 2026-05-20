package com.smartpos.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class BillResponse {

    private Long billId;
    private Double totalAmount;
    private LocalDateTime billDate;
    private List<BillItemResponse> items;

    public BillResponse() {
    }

    public BillResponse(
            Long billId,
            Double totalAmount,
            LocalDateTime billDate,
            List<BillItemResponse> items
    ) {
        this.billId = billId;
        this.totalAmount = totalAmount;
        this.billDate = billDate;
        this.items = items;
    }

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDateTime billDate) {
        this.billDate = billDate;
    }

    public List<BillItemResponse> getItems() {
        return items;
    }

    public void setItems(List<BillItemResponse> items) {
        this.items = items;
    }
}