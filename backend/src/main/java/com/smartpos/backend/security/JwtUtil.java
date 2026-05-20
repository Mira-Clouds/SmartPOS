package com.smartpos.backend.security;

import com.smartpos.backend.entity.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET =
            "smartpossmartpossmartpossmartpos123456";

    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // GENERATE TOKEN WITH ROLE
    public String generateToken(String username, Role role) {

        return Jwts.builder()
                .setSubject(username)

                .claim("role", role.name())

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )

                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // EXTRACT USERNAME
    public String extractUsername(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // EXTRACT ROLE
    public String extractRole(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }
}