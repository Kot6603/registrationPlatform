package com.nzpmc.kyum151.competitions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmc.kyum151.competitions.dtos.CreateCompetitionDto;

@Service
public class CompetitionService {

  @Autowired
  CompetitionRepository competitionRepository;

  public List<Competition> getCompetitions() {
    return competitionRepository.findAll();
  }

  public Competition createCompetition(CreateCompetitionDto createCompetitionDto) {
    Competition competition = new Competition(
        createCompetitionDto.getTitle());
    return competitionRepository.save(competition);
  }
}
