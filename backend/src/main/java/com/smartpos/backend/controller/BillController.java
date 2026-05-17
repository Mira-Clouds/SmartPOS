package com.smartpos.backend.controller;

import com.smartpos.backend.entity.Bill;
import com.smartpos.backend.repository.BillRepository;
import com.smartpos.backend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @Autowired
    private BillRepository billRepository;

    // CREATE BILL
    @PostMapping
    public Bill createBill(@RequestBody Bill bill) {
        return billService.saveBill(bill);
    }

    // GET ALL BILLS
    @GetMapping
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }
}