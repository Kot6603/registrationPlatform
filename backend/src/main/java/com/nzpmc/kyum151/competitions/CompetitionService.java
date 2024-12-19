package com.nzpmc.kyum151.competitions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmc.kyum151.competitions.dtos.CreateCompetitionDto;

@Service
public class CompetitionService {

  @Autowired
  CompetitionRepository competitionRepository;

  public Competition createCompetition(CreateCompetitionDto createCompetitionDto) {
    Competition competition = new Competition(
        createCompetitionDto.getTitle());
    return competitionRepository.save(competition);
  }
}
