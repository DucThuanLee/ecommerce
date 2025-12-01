package de.ecommerce.common.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class ErrorResponse {

    private ErrorDetail error;

    @Data
    @Builder
    public static class ErrorDetail {
        private String code;
        private String message;
        private String field;
        private String type;
        private int status;
        private Instant timestamp;
        private String traceId;
    }
}
