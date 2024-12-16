package com.nzpmc.kyum151.competitions;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questions")
public class Question {

  @Id
  private String id;

  private String title;
  private List<String> options;
  private int correctOptionIndex;

  public Question(String title, List<String> options, int correctOptionIndex) {
    this.title = title;
    this.options = options;
    this.correctOptionIndex = correctOptionIndex;
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

  public int getCorrectOptionIndex() {
    return correctOptionIndex;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setOptions(List<String> options) {
    this.options = options;
  }

  public void setCorrectOptionIndex(int correctOptionIndex) {
    this.correctOptionIndex = correctOptionIndex;
  }
}
