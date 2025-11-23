package de.ecommerce.userservice.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_users_email", columnNames = "email"),
                @UniqueConstraint(name = "uk_users_phone", columnNames = "phone")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder // Allows the use of the Builder Design Pattern for more flexible and readable object creation (e.g. User.builder().email("test@mail.com").build();).
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // means that the database (e.g. MySQL, PostgreSQL) will automatically manage and increment the value of the primary key (AUTO_INCREMENT).
    private Long id;

    // The email remains unique for the auth-service reference.
    @Column(nullable = false, unique = true, length = 180)
    private String email;

    @Column(nullable = false, length = 180)
    private String fullName;

    @Column(unique = true, length = 30)
    private String phone;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;
    @PrePersist // This method is called immediately before the Entity is saved for the first time (INSERT) into the database. It sets createdAt and updatedAt to the current time.
    void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate // This method is called immediately before the Entity is updated (UPDATE) in the database. It ensures that updatedAt is always updated to the current time, helping to track changes.
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
