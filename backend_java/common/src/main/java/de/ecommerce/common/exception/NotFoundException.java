package de.ecommerce.common.exception;

import de.ecommerce.common.enums.ErrorCode;

public class NotFoundException extends BusinessException {
    public NotFoundException(String message) {
        super(ErrorCode.USER_NOT_FOUND, message);
    }
}
