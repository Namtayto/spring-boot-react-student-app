package com.nam.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtProvider {
    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        String jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 3600000))
                .claim("email", auth.getName())
                .signWith(key).compact();

        return jwt;
    }

    public String generateTokenByEmail(String email) {
        String jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 3600000))
                .claim("email", email)
                .signWith(key).compact();

        return jwt;
    }

    public String getEmailFromToken(String jwt) {
        jwt = jwt.substring(7);

        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        String email = String.valueOf(claims.get("email"));

        return email;
    }
}
