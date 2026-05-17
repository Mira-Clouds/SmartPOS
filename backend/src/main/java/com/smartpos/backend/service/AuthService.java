package com.smartpos.backend.service;

import com.smartpos.backend.dto.RegisterRequest;
import com.smartpos.backend.entity.User;
import com.smartpos.backend.repository.UserRepository;
import com.smartpos.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smartpos.backend.entity.Role;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // LOGIN
    @Autowired
    private JwtUtil jwtUtil;

    public String login(String username, String password) {

        User user = userRepository.findByUsername(username);

        if(user == null) {
            return "User not found";
        }

        if(!user.getPassword().equals(password)) {
            return "Invalid password";
        }

        return jwtUtil.generateToken(user.getUsername());
    }

    // REGISTER
    public String register(RegisterRequest request) {

        // username already exists
        if(userRepository.findByUsername(request.getUsername()) != null) {
            return "Username already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole(Role.valueOf(request.getRole()));

        userRepository.save(user);

        return "User Registered Successfully";
    }
}