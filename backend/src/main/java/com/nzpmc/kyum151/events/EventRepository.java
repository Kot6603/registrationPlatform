package com.nzpmc.kyum151.events;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
}
