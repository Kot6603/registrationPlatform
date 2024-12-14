package com.nzpmc.kyum151.users;

import java.util.Map;

import com.nzpmc.kyum151.models.SignupRequest;

import org.springframework.beans.factory.annotation.Autowired;
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

  @Autowired
  UserService userService;

  // public routes
  @PostMapping("/signup")
  public ResponseEntity<Object> signup(@RequestBody SignupRequest signupRequest) {
    try {
      String token = userService.signup(signupRequest);
      Map<String, String> response = Map.of(
          "email", signupRequest.getEmail(),
          "token", token);
      return ResponseEntity.ok(response);
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
