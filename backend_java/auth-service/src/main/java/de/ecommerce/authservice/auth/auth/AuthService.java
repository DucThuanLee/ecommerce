package de.ecommerce.authservice.auth.auth;

import de.ecommerce.authservice.auth.dto.AuthResponse;
import de.ecommerce.authservice.auth.dto.LoginRequest;
import de.ecommerce.authservice.auth.dto.RegisterRequest;
import de.ecommerce.authservice.auth.jwt.JwtService;
import de.ecommerce.authservice.user.UserDetailsImpl;
import de.ecommerce.authservice.user.entity.AuthUser;
import de.ecommerce.authservice.user.entity.Role;
import de.ecommerce.authservice.user.repository.AuthUserRepository;
import de.ecommerce.common.enums.ErrorCode;
import de.ecommerce.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BusinessException(ErrorCode.DUPLICATE_USERNAME, ErrorCode.DUPLICATE_EMAIL.getMessage());
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException(ErrorCode.DUPLICATE_EMAIL, ErrorCode.DUPLICATE_EMAIL.getMessage());
        }

        AuthUser user = AuthUser.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        AuthUser saved = userRepository.save(user);
        String token = jwtService.generateToken(new UserDetailsImpl(saved));

        // --- Return standard AuthResponse ---
        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // validate credentials bằng AuthenticationManager
        var authToken = new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        );
        authenticationManager.authenticate(authToken);

        AuthUser user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(new UserDetailsImpl(user));
        // --- Return standard AuthResponse ---
        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .build();
    }
}