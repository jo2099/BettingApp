package com.BettingApp.main.service;

import com.BettingApp.main.model.AbstractGame;
import com.BettingApp.main.model.AbstractTeam;
import com.BettingApp.main.model.SoccerGame;
import com.BettingApp.main.model.SoccerTeam;
import com.BettingApp.main.util.Subscriber;
import com.BettingApp.main.service.TeamService;
import com.BettingApp.main.util.Event;
import com.BettingApp.main.model.GameEvent;
import com.BettingApp.main.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Optional;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

@Service
public class GameService implements Subscriber<Event> {

  @Autowired
  private GameRepository gameRepository;
  @Autowired
  private TeamService teamService;

  private final Random random = new Random();
  @Autowired
  private SimpMessagingTemplate messagingTemplate;

  private final ExecutorService executorService = Executors.newFixedThreadPool(10);

  public AbstractGame createRandomGame() {
    // TODO
    // implementar a logica para criacao de jogo aleatorio
    SoccerGame game = new SoccerGame();
    game.setHomeTeam(teamService.getRandomSoccerTeam());
    game.setAwayTeam(teamService.getRandomSoccerTeam());
    game.setLeague("Premiere League");
    game.setDuration(5L);
    game.setIntervalDuration(1L);

    return game;

  }

  @Scheduled(fixedRateString = "${game.scheduled.rate}")
  public void generateAndSimulateGames() {
    // Gera um jogo aleatório
    AbstractGame game = createRandomGame();
    game.subscribe(this);

    System.out.println("Gerando jogo: ");

    executorService.submit(() -> {
      try {
        boolean simulationresult = game.simulate();
        if (simulationresult) {
          gameRepository.save(game);
        } else {
          System.err.println("Falha na simulação do jogo.");
        }
      } catch (Exception e) {
        System.err.println("Erro ao simular o jogo: " + e.getMessage());
      }
    });
  }

  public void notifyClients(String message) {
    messagingTemplate.convertAndSend("/topic/game-status", message);
  }

  public void receive(Event event) {
    if (event instanceof GameEvent) {
      String message = ((GameEvent) event).toJson();
      notifyClients(message);
    }
  }
}
