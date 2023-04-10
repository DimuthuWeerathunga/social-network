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
  @NotBlank
  @Size(max = 50)
  private String name;
  @Email
  @NotNull
  private String email;
  @NotBlank
  private String password;
  @NotBlank
  private String confirmPassword;
  @Past
  private LocalDate birthday;
  private String bio;
  @NotNull
  private Gender gender;

}
