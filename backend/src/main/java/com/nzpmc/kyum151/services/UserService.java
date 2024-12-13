package com.nzpmc.kyum151.services;

import com.nzpmc.kyum151.models.SignupRequest;
import com.nzpmc.kyum151.models.User;
import com.nzpmc.kyum151.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // signup method
  public String signup(SignupRequest signupRequest) {
    String email = signupRequest.getEmail();
    String password = signupRequest.getPassword();
    String name = signupRequest.getName();
    // validation
    if (email == null || password == null) {
      throw new IllegalArgumentException("All fields must be provided");
    }

    if (userRepository.findByEmail(email).isPresent()) {
      throw new IllegalArgumentException("Email already in use");
    }
    String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
    User user = new User(email, hashedPassword, name);
    userRepository.save(user);

    return "User created";
  }
}
