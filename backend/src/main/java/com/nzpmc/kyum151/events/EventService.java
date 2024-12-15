package com.nzpmc.kyum151.events;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {
  @Autowired
  EventRepository eventRepository;

  public List<Event> getEvents() {
    return eventRepository.findAll();
  }
}
