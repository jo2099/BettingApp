package com.BettingApp.main.model;

import com.BettingApp.main.util.Event;

public class GameEvent implements Event {

  public static final String TYPE = "game_event";
  private String message;
  AbstractGame game;

  public GameEvent(AbstractGame game, String message) {
    this.game = game;
    this.message = message;
  }

  @Override
  public String getType() {
    return TYPE;
  }

  @Override
  public String getMessage() {
    return message;
  }

  @Override
  public String toJson() {
    return "{\"type\":\"" + getType() + "\",\"message\":\"" + getMessage() + "\",\"game\":" + game.getId() + "}";
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setGame(AbstractGame game) {
    this.game = game;
  }

  public AbstractGame getGame() {
    return game;
  }

}
