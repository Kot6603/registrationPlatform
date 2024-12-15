package com.nzpmc.kyum151.users;

import com.nzpmc.kyum151.users.dtos.LoginUserDto;
import com.nzpmc.kyum151.users.dtos.SignupUserDto;
import com.nzpmc.kyum151.users.dtos.UserUpdateDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  AuthenticationManager authenticationManager;

  public User signup(SignupUserDto input) {
    String email = input.getEmail();
    String password = input.getPassword();
    String name = input.getName();

    // validation
    if (email == null || password == null) {
      throw new IllegalArgumentException("All fields must be provided");
    }

    if (userRepository.findByEmail(email).isPresent()) {
      throw new IllegalArgumentException("Email already in use");
    }

    String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
    User user = new User(email, hashedPassword, name);
    return userRepository.save(user);
  }

  public User login(LoginUserDto input) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            input.getEmail(), input.getPassword()));

    return userRepository.findByEmail(input.getEmail())
        .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
  }

  public User updateUser(String id, UserUpdateDto input) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    String name = input.getName();
    if (name != null) {
      user.setName(name);
    }

    return userRepository.save(user);
  }
}
