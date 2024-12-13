package com.nzpmc.kyum151.services;

import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;

@Component
public class JwtService {
  private final JwtEncoder jwtEncoder;

  public JwtService(JwtEncoder jwtEncoder) {
    this.jwtEncoder = jwtEncoder;
  }

  public String encode(Map<String, Object> claims) {
    Instant now = Instant.now();
    Instant expiry = now.plus(3, ChronoUnit.DAYS);
    JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
        .issuer("kyum151")
        .subject("user")
        .issuedAt(now)
        .expiresAt(expiry)
        .claims(claims)
        .build();
    JwtEncoderParameters parameters = new JwtEncoderParameters(jwtClaimsSet);
    return this.jwtEncoder.encode(parameters).getTokenValue();
  }
}
