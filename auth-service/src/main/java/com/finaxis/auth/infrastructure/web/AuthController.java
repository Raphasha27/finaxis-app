package com.finaxis.auth.infrastructure.web;

import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // MOCKED: In a real system, verify credentials against DB/AD
        if ("bank_admin".equals(request.getUsername()) && "password".equals(request.getPassword())) {
            String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_for_demo";
            return ResponseEntity.ok(Map.of(
                "token", token,
                "role", "ADMIN",
                "expiresIn", 3600
            ));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @Data
    static class LoginRequest {
        private String username;
        private String password;
    }
}
