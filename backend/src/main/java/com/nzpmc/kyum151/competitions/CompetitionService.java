package com.nzpmc.kyum151.competitions;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmc.kyum151.competitions.dtos.AddQuestionDto;
import com.nzpmc.kyum151.competitions.dtos.AttemptDto;
import com.nzpmc.kyum151.competitions.dtos.CreateCompetitionDto;
import com.nzpmc.kyum151.competitions.dtos.QuestionResponse;

@Service
public class CompetitionService {

  @Autowired
  CompetitionRepository competitionRepository;
  @Autowired
  QuestionRepository questionRepository;
  @Autowired
  AttemptRepository attemptRepository;

  public List<Competition> getCompetitions() {
    return competitionRepository.findAll();
  }

  public List<QuestionResponse> getQuestionsForTest(String competitionId) {
    Competition competition = competitionRepository.findById(competitionId).orElseThrow(
        () -> new IllegalArgumentException("Competition not found"));
    List<String> questionsId = competition.getQuestionsId();

    List<Question> questions = questionRepository.findAllById(questionsId);

    return questions.stream()
        .map(question -> new QuestionResponse(question.getId(), question.getTitle(), question.getOptions()))
        .collect(Collectors.toList());
  }

  public Attempt createAttempt(String studentEmail, String competitionId, AttemptDto attemptDto) {
    Attempt newAttempt = new Attempt(studentEmail, competitionId, attemptDto.getAttempt());
    return attemptRepository.save(newAttempt);
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

  public Question deleteQuestion(String competitionId, String questionId) {
    Competition competition = competitionRepository.findById(competitionId).orElseThrow(
        () -> new IllegalArgumentException("Competition not found"));

    competition.removeQuestionId(questionId);
    competitionRepository.save(competition);

    Question question = questionRepository.findById(questionId).orElseThrow(
        () -> new IllegalArgumentException("Question not found"));
    questionRepository.deleteById(questionId);

    return question;
  }
}
