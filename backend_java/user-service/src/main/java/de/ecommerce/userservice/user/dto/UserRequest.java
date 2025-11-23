package de.ecommerce.userservice.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data // @Data on a class, Lombok will automatically generate the following components during compilation: @Getter, @Setter, @RequiredArgsConstructor, @ToString, @EqualsAndHashCode, and @Log.
public class UserRequest {
    @NotBlank
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank
    @Size(min = 2, max = 180)
    private String fullName;

    @Size(min = 8, max = 30)
    private String phone;
}
