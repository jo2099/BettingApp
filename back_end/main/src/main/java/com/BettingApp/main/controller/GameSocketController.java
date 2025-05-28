package com.BettingApp.main.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameSocketController {

  @MessageMapping("/start-game")
  @SendTo("/topic/game-status")
  public String startGame(String message) {
    // Processa a mensagem recebida e retorna uma resposta
    return "Jogo iniciado: " + message;
  }
};
