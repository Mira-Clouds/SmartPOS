package com.smartpos.backend.controller;

import com.smartpos.backend.dto.LoginRequest;
import com.smartpos.backend.dto.RegisterRequest;
import com.smartpos.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        return authService.login(
                request.getUsername(),
                request.getPassword()
        );
    }

    // REGISTER
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }
}