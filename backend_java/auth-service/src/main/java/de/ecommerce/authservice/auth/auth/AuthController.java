package de.ecommerce.authservice.auth.auth;

import de.ecommerce.authservice.auth.dto.AuthResponse;
import de.ecommerce.authservice.auth.dto.LoginRequest;
import de.ecommerce.authservice.auth.dto.RegisterRequest;
import de.ecommerce.authservice.auth.jwt.JwtService;
import de.ecommerce.authservice.user.UserDetailsImpl;
import de.ecommerce.authservice.user.entity.AuthUser;
import de.ecommerce.authservice.user.repository.AuthUserRepository;
import de.ecommerce.common.dto.ApiResponse;
import de.ecommerce.common.enums.ErrorCode;
import de.ecommerce.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthUserRepository userRepository;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        log.info("REGISTER attempt for email={}", request.getEmail());
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public AuthUser me(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        // Trả về thông tin user hiện tại (có thể tạo DTO riêng nếu không muốn lộ password)
        AuthUser user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow();
        user.setPasswordHash(null); // tránh lộ hash
        return user;
    }

    @GetMapping("/ping")
    public String ping() {
        return "auth-service OK";
    }
}