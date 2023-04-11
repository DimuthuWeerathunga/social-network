package com.dimuthu.socmedauthservice.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

  private final AuthenticationService authenticationService;

  @PostMapping("/signup")
  public ResponseEntity<AuthenticationResponse> register(
      @Valid @RequestBody RegisterRequest request
  ) {
    return ResponseEntity.ok( authenticationService.register(request));
  }

  @PostMapping("/signin")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @Valid @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(authenticationService.authenticate(request));
  }

  @GetMapping("/user")
  public Object getAuthenticatedUser(Authentication authentication){
    return authentication.getPrincipal();
  }
}

