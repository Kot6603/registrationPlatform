package com.nzpmc.kyum151.competitions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nzpmc.kyum151.competitions.dtos.CreateCompetitionDto;
import com.nzpmc.kyum151.users.User;

@CrossOrigin
@RestController
@RequestMapping("/api/competitions")
public class CompetitionController {

  @Autowired
  CompetitionService competitionService;

  // public routes
  @GetMapping()
  public ResponseEntity<List<Competition>> getCompetitions() {
    List<Competition> competitions = competitionService.getCompetitions();
    return ResponseEntity.ok(competitions);
  }

  @GetMapping("/{id}/questions")
  public ResponseEntity<List<Question>> getQuestions(@PathVariable String id) {
    List<Question> questions = competitionService.getQuestions(id);
    return ResponseEntity.ok(questions);
  }

  // protected routes

  // admin routes
  @PostMapping()
  public ResponseEntity<Competition> createCompetition(@RequestBody CreateCompetitionDto createCompetitionDto) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    if (!user.getEmail().equals("admin@gmail.com")) {
      throw new IllegalArgumentException("You are not authorized to create a competition");
    }

    Competition competition = competitionService.createCompetition(createCompetitionDto);
    return ResponseEntity.ok(competition);
  }
}
