package com.nzpmc.kyum151.events;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nzpmc.kyum151.events.dtos.UpdateCompetitionDto;
import com.nzpmc.kyum151.events.dtos.CreateEventDto;
import com.nzpmc.kyum151.events.dtos.JoinEventDto;
import com.nzpmc.kyum151.users.User;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {

  @Autowired
  EventService eventService;

  // public routes
  @GetMapping()
  public ResponseEntity<List<Event>> getEvents() {
    List<Event> events = eventService.getEvents();
    return ResponseEntity.ok(events);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Event> getEventById(@PathVariable String id) {
    Event event = eventService.getEventById(id);
    return ResponseEntity.ok(event);
  }

  // protected routes
  @PostMapping("/{id}/users")
  public ResponseEntity<Event> addUserToEvent(@PathVariable String id, @RequestBody JoinEventDto joinEventDto) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();

    if (!user.getId().equals(joinEventDto.getUserId())) {
      throw new IllegalArgumentException("You are not authorized to update this user");
    }

    Event event = eventService.addUserToEvent(id, joinEventDto.getUserId());
    return ResponseEntity.ok(event);
  }

  // admin routes
  @PostMapping()
  public ResponseEntity<Event> createEvent(@RequestBody CreateEventDto createEventDto) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    if (!user.getEmail().equals("admin@gmail.com")) {
      throw new IllegalArgumentException("You are not authorized to create an event");
    }
    Event event = eventService.createEvent(createEventDto);
    return ResponseEntity.ok(event);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Event> deleteEvent(@PathVariable String id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    if (!user.getEmail().equals("admin@gmail.com")) {
      throw new IllegalArgumentException("You are not authorized to create an event");
    }

    Event event = eventService.deleteEvent(id);
    return ResponseEntity.ok(event);
  }

  @PatchMapping("/{id}/competitions")
  public ResponseEntity<Event> addCompetition(@PathVariable String id,
      @RequestBody UpdateCompetitionDto updateCompetitionDto) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    if (!user.getEmail().equals("admin@gmail.com")) {
      throw new IllegalArgumentException("You are not authorized to update an event");
    }
    Event event = eventService.updateEvent(id, updateCompetitionDto);
    return ResponseEntity.ok(event);
  }
}
