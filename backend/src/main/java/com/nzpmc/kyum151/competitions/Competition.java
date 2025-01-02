package com.nzpmc.kyum151.competitions;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "competitions")
public class Competition {

  @Id
  private String id;

  private String title;
  private List<String> questionsId;
  private Date startTime;
  private Date endTime;

  public Competition(String title, Date startTime, Date endTime) {
    this.title = title;
    this.questionsId = List.of();
    this.startTime = startTime;
    this.endTime = endTime;
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

  public Date getStartTime() {
    return startTime;
  }

  public Date getEndTime() {
    return endTime;
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

  public void setStartTime(Date startTime) {
    this.startTime = startTime;
  }

  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }
}
