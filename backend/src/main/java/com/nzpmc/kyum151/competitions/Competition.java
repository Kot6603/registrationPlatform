package com.nzpmc.kyum151.competitions;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "competitions")
public class Competition {

  @Id
  private String id;

  private String title;
  private List<String> questionsId;

  public Competition(String title) {
    this.title = title;
    this.questionsId = List.of();
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public List<String> getQuestionsId() {
    return questionsId;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setQuestionsId(List<String> questionsId) {
    this.questionsId = questionsId;
  }

  public void addQuestionId(String questionId) {
    this.questionsId.add(questionId);
  }

  public void removeQuestionId(String questionId) {
    this.questionsId.remove(questionId);
  }
}
