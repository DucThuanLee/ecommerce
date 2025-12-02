package de.ecommerce.common.exception;

import de.ecommerce.common.dto.ApiResponse;
import de.ecommerce.common.dto.ErrorResponse;
import de.ecommerce.common.enums.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler {
//    @ExceptionHandler(BusinessException.class)
//    public ApiResponse<?> handleBusiness(BusinessException ex) {
//        return ApiResponse.error(ex.getMessage());
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ApiResponse<?> handleGeneral(Exception ex) {
//        return ApiResponse.error("Internal error");
//    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException ex) {

        ErrorResponse response =  ErrorResponse.builder()
                .error(
                        ErrorResponse.ErrorDetail.builder()
                                .code(ex.getErrorCode().name().toLowerCase())
                                .message(ex.getMessage())
                                .field(null) // bạn có thể truyền param nếu có
                                .type("business_error")
                                .status(HttpStatus.BAD_REQUEST.value())
                                .timestamp(Instant.now())
                                .traceId(UUID.randomUUID().toString())
                                .build()
                )
                .build();
        //return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ErrorResponse handleGeneral(Exception ex) {
        return ErrorResponse.builder()
                .error(
                        ErrorResponse.ErrorDetail.builder()
                                .code(ErrorCode.INTERNAL_ERROR.name().toLowerCase())
                                .message("Internal server error")
                                .type("internal_error")
                                .status(500)
                                .timestamp(Instant.now())
                                .traceId(UUID.randomUUID().toString())
                                .build()
                )
                .build();
    }
}
