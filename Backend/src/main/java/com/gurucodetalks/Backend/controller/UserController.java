package com.gurucodetalks.Backend.controller;

import com.gurucodetalks.Backend.dto.UserRegistrationRequest;
import com.gurucodetalks.Backend.entity.User;
import com.gurucodetalks.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/register")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> register(@RequestBody UserRegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User(request.getEmail(), request.getPassword());
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
}
