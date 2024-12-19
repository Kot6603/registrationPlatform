package com.nzpmc.kyum151.competitions;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionRepository extends MongoRepository<Competition, String> {
}
