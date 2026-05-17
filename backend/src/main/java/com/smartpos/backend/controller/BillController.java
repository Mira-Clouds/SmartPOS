package com.smartpos.backend.controller;

import com.smartpos.backend.entity.Bill;
import com.smartpos.backend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping
    public Bill saveBill(@RequestBody Bill bill) {
        return billService.saveBill(bill);
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }
}