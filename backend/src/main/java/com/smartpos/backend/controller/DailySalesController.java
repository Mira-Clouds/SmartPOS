package com.smartpos.backend.controller;

import com.smartpos.backend.dto.DailySalesResponse;
import com.smartpos.backend.service.DailySalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
public class DailySalesController {

    @Autowired
    private DailySalesService dailySalesService;

    @GetMapping("/daily")
    public DailySalesResponse getTodaySales() {
        return dailySalesService.getTodaySales();
    }
}