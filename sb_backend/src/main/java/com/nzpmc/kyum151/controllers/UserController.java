package com.nzpmc.kyum151.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

  @RequestMapping("/")
  public String index() {
    return "Greetings from Spring Boot!";
  }

  // eg
  @PostMapping("/login")
  public ResponseEntity<Object> createStudent(@RequestBody Map<String, String> studentData) {
    System.out.println("createStudent endpoint was triggered");
    return ResponseEntity.ok().build();
  }

}
