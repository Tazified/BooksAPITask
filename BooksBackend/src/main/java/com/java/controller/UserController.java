package com.java.controller;


import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.security.AuthRequest;
import com.java.security.AuthResponse;
import com.java.security.JwtUtil;

@RestController
public class UserController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        Authentication auth = authManager.authenticate(
		        new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

		UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
		String token = jwtUtil.generateToken(userDetails.getUsername());

		return ResponseEntity.ok(new AuthResponse(token));
    }
}
