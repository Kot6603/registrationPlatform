package com.nzpmc.kyum151.events;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {

  @Autowired
  EventService eventService;

  // public routes
  @GetMapping()
  public ResponseEntity<Object> getEvents() {
    List<Event> events = eventService.getEvents();
    return ResponseEntity.ok(events);
  }

  // protected routes

  // admin routes

}
