package com.nzpmc.kyum151.events;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmc.kyum151.events.dtos.CreateEventDto;

@Service
public class EventService {
  @Autowired
  EventRepository eventRepository;

  public List<Event> getEvents() {
    return eventRepository.findAll();
  }

  public Event getEventById(String id) {
    return eventRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Event not found"));
  }

  public Event createEvent(CreateEventDto createEventDto) {
    Event event = new Event(
        createEventDto.getDate(),
        createEventDto.getName(),
        createEventDto.getDescription());
    return eventRepository.save(event);
  }
}
