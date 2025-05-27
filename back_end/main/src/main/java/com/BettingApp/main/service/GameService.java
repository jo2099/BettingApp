package com.BettingApp.main.service;

import com.BettingApp.main.model.AbstractGame;
import com.BettingApp.main.model.AbstractTeam;
import com.BettingApp.main.model.SoccerGame;
import com.BettingApp.main.model.SoccerTeam;
import com.BettingApp.main.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class GameService {

  @Autowired
  private GameRepository gameRepository;

  private final Random random = new Random();

  public AbstractGame createRandomGame() {
    // TODO
    // implementar a logica para criacao de jogo aleatorio
    SoccerGame game = new SoccerGame();
    game.setHomeTeam(new SoccerTeam("Team A", "League 1", "2023/2024"));
    game.setAwayTeam(new SoccerTeam("Team B", "League 1", "2023/2024"));
    game.setLeague("Premiere League");
    game.setDuration(5L);
    game.setIntervalDuration(1L);

    return game;

  }

  @Scheduled(fixedRateString = "${game.scheduled.rate}")
  public void generateAndSimulateGames() {
    // Gera um jogo aleatório
    AbstractGame game = createRandomGame();

    boolean simulationresult = game.simulate();

    if (simulationresult) {
      gameRepository.save(game);
    } else {
      System.err.println("Falha na simulação do jogo.");
    }

  }

}
