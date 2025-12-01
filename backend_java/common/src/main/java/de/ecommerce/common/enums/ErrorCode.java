package de.ecommerce.common.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ErrorCode {
    // --- Common errors ---
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "Invalid request"),

    // --- Auth errors ---
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    DUPLICATE_EMAIL(HttpStatus.BAD_REQUEST, "Email already used"),
    DUPLICATE_USERNAME(HttpStatus.BAD_REQUEST, "Username already taken"),
    DUPLICATE_PHONE(HttpStatus.BAD_REQUEST, "Phone already used"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid email or password"),

    // --- JWT errors ---
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Token expired"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid token"),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "Access denied");

    private final HttpStatus status;
    @Getter
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

}
