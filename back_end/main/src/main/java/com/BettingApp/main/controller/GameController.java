package com.BettingApp.main.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.BettingApp.main.model.GameEvent;

@Controller
public class GameController {

  public GameController() {
    System.out.println("GameController initialized");
  }

  @MessageMapping("/game-events") // listens to /app/game-events
  @SendTo("/topic/game-events") // broadcasts to /topic/game-events
  public GameEvent broadcastGameEvent(GameEvent event) {
    return event;
  }
}
