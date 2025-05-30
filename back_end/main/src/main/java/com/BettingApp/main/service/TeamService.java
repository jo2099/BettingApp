package com.BettingApp.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.BettingApp.main.model.AbstractTeam;
import com.BettingApp.main.model.SoccerTeam;
import com.BettingApp.main.repository.TeamRepository;

@Service
public class TeamService {
  @Autowired
  private TeamRepository teamRepository;

  public SoccerTeam getRandomSoccerTeam() {
    return (SoccerTeam) teamRepository.getRandomTeam("SOCCER")
        .orElseThrow(() -> new RuntimeException("No soccer teams available"));

  }

}
