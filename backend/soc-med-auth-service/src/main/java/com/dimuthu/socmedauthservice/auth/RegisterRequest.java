package com.dimuthu.socmedauthservice.auth;

import com.dimuthu.socmedauthservice.user.Gender;
import jakarta.validation.constraints.AssertTrue;
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
public class RegisterRequest {
  @NotBlank
  @Size( max = 50)
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

  @AssertTrue( message = "Password and confirm password fields do not match")
  public boolean doPasswordsMatch(){
    return password != null && password.equals(confirmPassword);
  }

}
