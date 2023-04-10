package com.dimuthu.socmedauthservice.auth;

import com.dimuthu.socmedauthservice.user.Gender;
import com.dimuthu.socmedauthservice.validation.FieldsValueMatch;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldsValueMatch(
    field = "password",
    fieldMatch = "confirmPassword",
    message = "Passwords do not match!"
)
public class RegisterRequest {
    @NotBlank(message = "Name must be provided")
    @Size(max = 50, message = "Name exceeds the maximum charater size")
    private String name;
    @Email
    @NotNull(message = "Email must not be null")
    private String email;
    @NotBlank(message = "Password required")
    private String password;
    @NotBlank
    private String confirmPassword;
    @Past(message = "Birthday must be in the past")
    @NotNull(message = "Birthday must be provided")
    private LocalDate birthday;
    private String bio;
    @NotNull(message = "Gender must be selected")
    private Gender gender;

}
