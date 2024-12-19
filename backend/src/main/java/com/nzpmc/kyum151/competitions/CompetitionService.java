package com.nzpmc.kyum151.competitions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmc.kyum151.competitions.dtos.AddQuestionDto;
import com.nzpmc.kyum151.competitions.dtos.CreateCompetitionDto;

@Service
public class CompetitionService {

  @Autowired
  CompetitionRepository competitionRepository;
  @Autowired
  QuestionRepository questionRepository;

  public List<Competition> getCompetitions() {
    return competitionRepository.findAll();
  }

  public List<Question> getQuestions(String competitionId) {
    Competition competition = competitionRepository.findById(competitionId).orElseThrow(
        () -> new IllegalArgumentException("Competition not found"));
    List<String> questionsId = competition.getQuestionsId();

    return questionRepository.findAllById(questionsId);
  }

  public Competition createCompetition(CreateCompetitionDto createCompetitionDto) {
    Competition competition = new Competition(
        createCompetitionDto.getTitle());
    return competitionRepository.save(competition);
  }

  public Question addQuestionToCompetition(String competitionId, AddQuestionDto addQuestionDto) {
    Competition competition = competitionRepository.findById(competitionId).orElseThrow(
        () -> new IllegalArgumentException("Competition not found"));

    Question question = new Question(addQuestionDto.getTitle(), addQuestionDto.getOptions(),
        addQuestionDto.getCorrectOptionIndex());

    Question newQuestion = questionRepository.save(question);
    competition.addQuestionId(newQuestion.getId());
    competitionRepository.save(competition);

    return newQuestion;
  }
}
