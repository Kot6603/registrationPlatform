package com.nzpmc.kyum151.competitions.dtos;

public class StudentMark {
  private String studentEmail;
  private int mark;

  public StudentMark(String studentEmail, Integer mark) {
    this.studentEmail = studentEmail;
    this.mark = mark;
  }

  public String getStudentEmail() {
    return studentEmail;
  }

  public int getMark() {
    return mark;
  }
}
