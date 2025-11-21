package de.ecommerce.userservice.user;

import de.ecommerce.common.enums.ErrorCode;
import de.ecommerce.common.exception.BusinessException;
import de.ecommerce.common.exception.NotFoundException;
import de.ecommerce.userservice.user.dto.CreateUserRequest;
import de.ecommerce.userservice.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repo;

    public UserResponse create(CreateUserRequest req) {

        if (repo.existsByEmail(req.getEmail())) {
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_EXISTS, "Email already exists");
        }

        if (repo.existsByPhone(req.getPhone())) {
            throw new BusinessException(ErrorCode.PHONE_ALREADY_EXISTS, "Phone already exists");
        }

        User user = User.builder()
                .email(req.getEmail())
                .password(req.getPassword())
                .fullName(req.getFullName())
                .phone(req.getPhone())
                .build();

        repo.save(user);
        return toResponse(user);
    }

    public UserResponse get(Long id) {
        User user = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
        return toResponse(user);
    }

    public UserResponse getByEmail(String email) {
        User u = repo.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));
        return toResponse(u);
    }

    public List<UserResponse> getAll() {
        return repo.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private UserResponse toResponse(User u) {
        return UserResponse.builder()
                .id(u.getId())
                .email(u.getEmail())
                .fullName(u.getFullName())
                .phone(u.getPhone())
                .build();
    }
}