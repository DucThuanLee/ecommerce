package de.ecommerce.userservice.user.repository;

import de.ecommerce.userservice.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Find user by email (used for registration/login)
    Optional<User> findByEmail(String email);

    // Check if email exists
    boolean existsByEmail(String email);

    // Find user by phone number
    Optional<User> findByPhone(String phone);

    // Check if phone number exists
    boolean existsByPhone(String phone);
}
