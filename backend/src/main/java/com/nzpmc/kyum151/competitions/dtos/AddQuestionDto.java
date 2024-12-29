package com.nzpmc.kyum151.competitions.dtos;

public class AddQuestionDto {
  private String questionId;

  public AddQuestionDto(String questionId) {
    this.questionId = questionId;
  }

  public String getQuestionId() {
    return questionId;
  }
}
