package de.ecommerce.authservice.auth.jwt;

import de.ecommerce.authservice.user.UserDetailsImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final Key signingKey;
    private final long jwtExpirationMillis;

    public JwtService(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.expiration-millis:3600000}") long jwtExpirationMillis
    ) {
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes());
        this.jwtExpirationMillis = jwtExpirationMillis;
    }

    public String generateToken(UserDetailsImpl userDetails) {
        return buildToken(Map.of("role", userDetails.getAuthorities()), userDetails.getUsername());
    }

    private String buildToken(Map<String, Object> extraClaims, String subject) {
        Instant now = Instant.now();
        return Jwts.builder().claims(extraClaims).subject(subject).issuedAt(Date.from(now)).expiration(Date.from(now.plusMillis(jwtExpirationMillis)))
                .signWith(signingKey)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = parseToken(token);
        return claimsResolver.apply(claims);
    }

    public boolean isTokenValid(String token, UserDetailsImpl userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    private Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

//    private SecretKey getSignInKey() {
//        //byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET_KEY);
//        //return Keys.hmacShaKeyFor(keyBytes);
//        byte[] bytes = Base64.getDecoder()
//                .decode(JWT_SECRET_KEY.getBytes(StandardCharsets.UTF_8));
//        return new SecretKeySpec(bytes, "HmacSHA256");
//    }
}
