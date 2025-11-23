package de.ecommerce.userservice.user.mapper;

import de.ecommerce.userservice.user.dto.UserRequest;
import de.ecommerce.userservice.user.dto.UserResponse;
import de.ecommerce.userservice.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserRequest req) {
        if (req == null) return null;

        return User.builder()
                .email(req.getEmail())
                .fullName(req.getFullName())
                .phone(req.getPhone())
                .build();
    }

    public UserResponse toResponse(User user) {
        if (user == null) return null;

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public void updateEntity(User user, UserRequest req) {
        if (req.getEmail() != null) {
            user.setEmail(req.getEmail());
        }
        if (req.getFullName() != null) {
            user.setFullName(req.getFullName());
        }
        if (req.getPhone() != null) {
            user.setPhone(req.getPhone());
        }
    }
}