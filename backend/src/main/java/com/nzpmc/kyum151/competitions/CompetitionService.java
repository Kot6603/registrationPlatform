package com.nzpmc.kyum151.competitions;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmc.kyum151.competitions.dtos.AddQuestionDto;
import com.nzpmc.kyum151.competitions.dtos.AttemptDto;
import com.nzpmc.kyum151.competitions.dtos.CreateCompetitionDto;
import com.nzpmc.kyum151.competitions.dtos.CreateQuestionDto;
import com.nzpmc.kyum151.competitions.dtos.MarkResponse;
import com.nzpmc.kyum151.competitions.dtos.QuestionResponse;
import com.nzpmc.kyum151.competitions.dtos.StudentMark;

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
    Competition competition = competitionRepository.findById(competitionId).orElseThrow(
        () -> new IllegalArgumentException("Competition not found"));
    Date endTime = competition.getEndTime();
    Instant instant = endTime.toInstant();
    instant = instant.plusSeconds(120);
    Date newEndTime = Date.from(instant);
    Date currentTime = new Date();
    if (currentTime.after(newEndTime)) {
      throw new IllegalArgumentException("Competition has ended");
    }

    Attempt newAttempt = new Attempt(studentEmail, competitionId, attemptDto.getAttempt());
    return attemptRepository.save(newAttempt);
  }

  public List<Question> getAllQuestions() {
    return questionRepository.findAll();
  }

  public List<Question> getQuestions(String competitionId) {
    Competition competition = competitionRepository.findById(competitionId).orElseThrow(
        () -> new IllegalArgumentException("Competition not found"));
    List<String> questionsId = competition.getQuestionsId();

    return questionRepository.findAllById(questionsId);
  }

  public Competition createCompetition(CreateCompetitionDto createCompetitionDto) {
    Competition competition = new Competition(
        createCompetitionDto.getTitle(), createCompetitionDto.getStartTime(), createCompetitionDto.getEndTime());
    return competitionRepository.save(competition);
  }

  public Question createQuestion(CreateQuestionDto createQuestionDto) {
    Question question = new Question(createQuestionDto.getTitle(), createQuestionDto.getOptions(),
        createQuestionDto.getCorrectOptionIndex(), createQuestionDto.getDifficulty(), createQuestionDto.getTopic());

    return questionRepository.save(question);
  }

  public Question addQuestionToCompetition(String competitionId, AddQuestionDto addQuestionDto) {
    Competition competition = competitionRepository.findById(competitionId).orElseThrow(
        () -> new IllegalArgumentException("Competition not found"));
    Question newQuestion = questionRepository.findById(addQuestionDto.getQuestionId()).orElseThrow(
        () -> new IllegalArgumentException("Question not found"));

    competition.addQuestionId(addQuestionDto.getQuestionId());
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
    return question;
  }

  public MarkResponse markCompetition(String competitionId) {
    Competition competition = competitionRepository.findById(competitionId).orElseThrow(
        () -> new IllegalArgumentException("Competition not found"));

    List<String> questions = competition.getQuestionsId();
    Integer totalMarks = questions.size();

    List<Attempt> attempts = attemptRepository.findAllByCompetitionId(competitionId);
    List<StudentMark> marksList = new ArrayList<>();

    for (Attempt attempt : attempts) {
      // for each student
      Integer mark = 0;
      Map<String, Integer> studentAttempt = attempt.getAttempts();

      for (int i = 0; i < questions.size(); i++) {
        // for each question
        String questionId = questions.get(i);
        Question question = questionRepository.findById(questionId).orElseThrow(
            () -> new IllegalArgumentException("Question not found"));

        Integer correctOptionIndex = question.getCorrectOptionIndex();
        Integer studentOptionIndex = studentAttempt.get(questionId);

        if (correctOptionIndex.equals(studentOptionIndex)) {
          mark++;
        }
      }

      StudentMark studentMark = new StudentMark(attempt.getStudentEmail(), mark);
      marksList.add(studentMark);
    }

    return new MarkResponse(competition.getTitle(), totalMarks, marksList);
  }
}
