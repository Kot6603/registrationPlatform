package com.nzpmc.kyum151.models;

public class SignupRequest {
  private String email;
  private String password;
  private String name;

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public String getName() {
    return name;
  }

  public String toString() {
    return "SignupRequest{email=" + email + ", password=" + password + ", name=" + name + "}";
  }
}
