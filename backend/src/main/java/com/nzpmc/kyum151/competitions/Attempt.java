package com.nzpmc.kyum151.competitions;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "attempts")
public class Attempt {
  @Id
  private String id;

  private String studentEmail;
  private String competitionId;
  private Map<String, Integer> attempts;

  public Attempt(String studentEmail, String competitionId, Map<String, Integer> attempts) {
    this.studentEmail = studentEmail;
    this.competitionId = competitionId;
    this.attempts = attempts;
  }

  public String getId() {
    return id;
  }

  public String getStudentEmail() {
    return studentEmail;
  }

  public String getCompetitionId() {
    return competitionId;
  }

  public Map<String, Integer> getAttempts() {
    return attempts;
  }

  public void setStudentEmail(String studentEmail) {
    this.studentEmail = studentEmail;
  }

  public void setCompetitionId(String competitionId) {
    this.competitionId = competitionId;
  }

  public void setAttempts(Map<String, Integer> attempts) {
    this.attempts = attempts;
  }
}
