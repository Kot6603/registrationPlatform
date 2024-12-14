package com.nzpmc.kyum151.users;

import com.nzpmc.kyum151.models.SignupRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

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
