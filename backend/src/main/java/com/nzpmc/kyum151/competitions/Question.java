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
  private String difficulty;
  private String topic;

  public Question(String title, List<String> options, int correctOptionIndex, String difficulty, String topic) {
    this.title = title;
    this.options = options;
    this.correctOptionIndex = correctOptionIndex;
    this.difficulty = difficulty;
    this.topic = topic;
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

  public String getDifficulty() {
    return difficulty;
  }

  public String getTopic() {
    return topic;
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

  public void setDifficulty(String difficulty) {
    this.difficulty = difficulty;
  }

  public void setTopic(String topic) {
    this.topic = topic;
  }
}
