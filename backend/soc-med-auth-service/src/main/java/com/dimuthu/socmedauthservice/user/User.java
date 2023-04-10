package com.dimuthu.socmedauthservice.user;

import com.dimuthu.socmedauthservice.token.Token;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {

  @Id
  @SequenceGenerator(
      name = "user_sequence",
      sequenceName = "user_sequence",
      allocationSize = 1
  )
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
  @Column(
      updatable = false
  )
  private Long id;
  @NotBlank(message = "Name must not be empty")
  @Size(max = 50)
  private String name;
  @Email(message = "Email must be valid")
  @NotNull
  private String email;
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String password;
  @Past(message = "Birthday should be in the past")
  @NotNull
  private LocalDate birthday;
  private String bio;
  @NotNull(message = "Please select your gender")
  private Gender gender;

  @Enumerated(EnumType.STRING)
  @NotNull(message = "User must have a role")
  private Role role;

  @OneToMany(mappedBy = "user")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private List<Token> tokens;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public String toString() {
    return "User{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", email='" + email + '\'' +
        ", password='" + password + '\'' +
        ", birthday=" + birthday +
        ", bio='" + bio + '\'' +
        ", gender=" + gender +
        ", role=" + role +
        '}';
  }
}
