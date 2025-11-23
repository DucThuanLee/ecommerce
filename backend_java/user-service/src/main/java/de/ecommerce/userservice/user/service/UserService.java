package de.ecommerce.userservice.user.service;

import de.ecommerce.userservice.user.dto.UserRequest;
import de.ecommerce.userservice.user.dto.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);

    UserResponse getUserById(Long id);

    List<UserResponse> getAllUsers();

    UserResponse updateUser(Long id, UserRequest request);

    void deleteUser(Long id);
}
