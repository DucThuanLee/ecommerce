package de.ecommerce.userservice.user;

import de.ecommerce.userservice.user.dto.CreateUserRequest;
import de.ecommerce.userservice.user.dto.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toDto(User u) {
        if (u == null) return null;

        return UserResponse.builder()
                .id(u.getId())
                .email(u.getEmail())
                .fullName(u.getFullName())
                .phone(u.getPhone())
                .build();
    }

    public User fromCreateRequest(CreateUserRequest req) {
        return User.builder()
                .email(req.getEmail())
                .password(req.getPassword())
                .fullName(req.getFullName())
                .phone(req.getPhone())
                .build();
    }
}