package com.smartpos.backend.service;

import com.smartpos.backend.dto.RegisterRequest;
import com.smartpos.backend.entity.Role;
import com.smartpos.backend.entity.User;
import com.smartpos.backend.repository.UserRepository;
import com.smartpos.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER
    public String register(RegisterRequest request) {

        User existingUser =
                userRepository.findByUsername(request.getUsername());

        if (existingUser != null) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setUsername(request.getUsername());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(
                Role.valueOf(
                        request.getRole().toUpperCase()
                )
        );

        userRepository.save(user);

        return "User Registered Successfully";
    }

    // LOGIN
    public String login(String username, String password) {

        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("Invalid Username");
        }

        if (!passwordEncoder.matches(
                password,
                user.getPassword()
        )) {
            throw new RuntimeException("Invalid Password");
        }

        return jwtUtil.generateToken(
                user.getUsername(),
                user.getRole()
        );
    }
}