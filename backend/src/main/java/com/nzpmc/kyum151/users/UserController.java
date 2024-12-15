package com.nzpmc.kyum151.users;

import com.nzpmc.kyum151.services.JwtService;
import com.nzpmc.kyum151.users.dtos.LoginResponse;
import com.nzpmc.kyum151.users.dtos.LoginUserDto;
import com.nzpmc.kyum151.users.dtos.SignupUserDto;
import com.nzpmc.kyum151.users.dtos.UserResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

  // protected routes
  @GetMapping("/{id}")
  public ResponseEntity<UserResponse> getUserById(@PathVariable String id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();

    if (!user.getId().equals(id)) {
      throw new IllegalArgumentException("You are not authorized to view this user");
    }

    return ResponseEntity.ok(new UserResponse(user.getEmail(), user.getName()));
  }
}
