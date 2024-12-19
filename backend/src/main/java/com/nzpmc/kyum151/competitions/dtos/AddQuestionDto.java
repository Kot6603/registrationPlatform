package com.nzpmc.kyum151.competitions.dtos;

import java.util.List;

public class AddQuestionDto {
  private String title;
  private List<String> options;
  private int correctOptionIndex;

  public AddQuestionDto(String title, List<String> options, int correctOptionIndex) {
    this.title = title;
    this.options = options;
    this.correctOptionIndex = correctOptionIndex;
  }

  public String getTitle() {
    return title;
  }

  public List<String> getOptions() {
    return options;
  }

  public int getCorrectOptionIndex() {
    return correctOptionIndex;
  }
}
