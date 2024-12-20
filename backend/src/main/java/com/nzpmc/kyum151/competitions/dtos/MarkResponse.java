package com.nzpmc.kyum151.competitions.dtos;

import java.util.List;

public class MarkResponse {
  private String title;
  private Integer totalMarks;
  private List<StudentMark> marks;

  public MarkResponse(String title, Integer totalMarks, List<StudentMark> marks) {
    this.title = title;
    this.totalMarks = totalMarks;
    this.marks = marks;
  }

  public String getTitle() {
    return title;
  }

  public Integer getTotalMarks() {
    return totalMarks;
  }

  public List<StudentMark> getMarks() {
    return marks;
  }
}
