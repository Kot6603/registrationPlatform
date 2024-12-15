package com.nzpmc.kyum151.users.dtos;

public class LoginResponse {
  private String id;
  private String email;
  private String token;

  public LoginResponse(String id, String email, String token) {
    this.id = id;
    this.email = email;
    this.token = token;
  }

  public String getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getToken() {
    return token;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
