package com.nzpmc.kyum151.users;

import java.util.Map;

import com.nzpmc.kyum151.services.JwtService;
import com.nzpmc.kyum151.users.dtos.LoginResponse;
import com.nzpmc.kyum151.users.dtos.LoginUserDto;
import com.nzpmc.kyum151.users.dtos.SignupUserDto;

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
  JwtService jwtService;
  @Autowired
  UserService userService;

  // public routes
  @PostMapping("/signup")
  public ResponseEntity<LoginResponse> signup(@RequestBody SignupUserDto signupUserDto) {
    User user = userService.signup(signupUserDto);
    String token = jwtService.generateToken(user);
    return ResponseEntity.ok(new LoginResponse(user.getId(), user.getEmail(), token));
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDto loginUserDto) {
    User user = userService.login(loginUserDto);
    String token = jwtService.generateToken(user);
    return ResponseEntity.ok(new LoginResponse(user.getId(), user.getEmail(), token));
  }
}
