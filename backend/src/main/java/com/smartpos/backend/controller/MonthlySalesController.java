package com.smartpos.backend.controller;

import com.smartpos.backend.dto.MonthlySalesResponse;
import com.smartpos.backend.service.MonthlySalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
public class MonthlySalesController {

    @Autowired
    private MonthlySalesService monthlySalesService;

    @GetMapping("/monthly")
    public MonthlySalesResponse getMonthlySales() {
        return monthlySalesService.getMonthlySales();
    }
}