package de.ecommerce.userservice.user.dto;

import lombok.Data;

@Data // @Data on a class, Lombok will automatically generate the following components during compilation: @Getter, @Setter, @RequiredArgsConstructor, @ToString, @EqualsAndHashCode, and @Log.
public class CreateUserRequest {
    private String email;
    private String password;
    private String fullName;
    private String phone;
}
