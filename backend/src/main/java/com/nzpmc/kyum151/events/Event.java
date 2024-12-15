package com.nzpmc.kyum151.events;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class Event {

  @Id
  private String id;

  private String date;
  private String name;
  private String description;
  private List<String> users;

  public Event(String date, String name, String description, List<String> users) {
    this.date = date;
    this.name = name;
    this.description = description;
    this.users = users;
  }

  // Getters and Setters
  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDate() {
    return date;
  }

  public String getDescription() {
    return description;
  }

  public List<String> getUsers() {
    return users;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setUsers(List<String> users) {
    this.users = users;
  }
}
