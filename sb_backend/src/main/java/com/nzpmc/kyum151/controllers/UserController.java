package com.nzpmc.kyum151.controllers;

import java.util.Map;

import com.nzpmc.kyum151.models.User;
import com.nzpmc.kyum151.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  // signup
  @PostMapping("/signup")
  public ResponseEntity<Object> signup(@RequestBody SignupRequest signupRequest) {
    try {
      User user = userService.signup(
          signupRequest.getEmail(),
          signupRequest.getPassword(),
          signupRequest.getName());
      return ResponseEntity.ok(user);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  // eg
  @GetMapping("/login")
  public ResponseEntity<Object> createStudent(@RequestBody Map<String, String> studentData) {
    System.out.println("createStudent endpoint was triggered");
    return ResponseEntity.ok().build();
  }
}
