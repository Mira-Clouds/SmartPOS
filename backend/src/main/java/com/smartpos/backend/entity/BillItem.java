package com.smartpos.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bill_items")
public class BillItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    private Double price;

    // MANY ITEMS -> ONE BILL
    @ManyToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;

    // MANY ITEMS -> ONE PRODUCT
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // Constructors

    public BillItem() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}