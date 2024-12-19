package com.nzpmc.kyum151.competitions.dtos;

import java.util.List;

public class QuestionResponse {
  private String id;
  private String title;
  private List<String> options;

  public QuestionResponse(String id, String title, List<String> options) {
    this.id = id;
    this.title = title;
    this.options = options;
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public List<String> getOptions() {
    return options;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setOptions(List<String> options) {
    this.options = options;
  }
}
