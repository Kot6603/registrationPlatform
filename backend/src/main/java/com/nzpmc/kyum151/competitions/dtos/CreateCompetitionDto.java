package com.nzpmc.kyum151.competitions.dtos;

public class CreateCompetitionDto {
  private String title;

  public CreateCompetitionDto(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
