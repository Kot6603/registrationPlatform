package com.nzpmc.kyum151.competitions;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttemptRepository extends MongoRepository<Attempt, String> {
  public List<Attempt> findAllByCompetitionId(String competitionId);
}
