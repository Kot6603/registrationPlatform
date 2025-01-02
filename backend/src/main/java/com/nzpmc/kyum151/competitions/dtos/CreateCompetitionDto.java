package com.nzpmc.kyum151.competitions.dtos;

import java.util.Date;

public class CreateCompetitionDto {
  private String title;
  private Date startTime;
  private Date endTime;

  public CreateCompetitionDto(String title, Date startTime, Date endTime) {
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public String getTitle() {
    return title;
  }

  public Date getStartTime() {
    return startTime;
  }

  public Date getEndTime() {
    return endTime;
  }
}
