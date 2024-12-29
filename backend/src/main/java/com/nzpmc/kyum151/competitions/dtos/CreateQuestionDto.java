package com.nzpmc.kyum151.competitions.dtos;

import java.util.List;

public class CreateQuestionDto {
  private String title;
  private List<String> options;
  private int correctOptionIndex;
  private String difficulty;
  private String topic;

  public CreateQuestionDto(String title, List<String> options, int correctOptionIndex, String difficulty,
      String topic) {
    this.title = title;
    this.options = options;
    this.correctOptionIndex = correctOptionIndex;
    this.difficulty = difficulty;
    this.topic = topic;
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

  public String getDifficulty() {
    return difficulty;
  }

  public String getTopic() {
    return topic;
  }
}
