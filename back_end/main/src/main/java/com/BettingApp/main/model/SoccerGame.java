package com.BettingApp.main.model;

import java.util.concurrent.TimeUnit;

import com.BettingApp.main.model.GameStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("SOCCER")
public class SoccerGame extends AbstractGame {

  private String league;
  private String season;
  private int homeScore;
  private int awayScore;
  private int numYellows;
  private int numReds;
  private GameStatus status = GameStatus.PENDING;
  private Long duration; // Duration in seconds for each half

  public SoccerGame() {
    // Default constructor
  }

  public SoccerGame(AbstractTeam homeTeam, AbstractTeam awayTeam, String league, String season) {
    super(homeTeam, awayTeam);
    this.league = league;
    this.season = season;
  }

  public String getLeague() {
    return league;
  }

  public void setLeague(String league) {
    this.league = league;
  }

  public String getSeason() {
    return season;
  }

  public void setSeason(String season) {
    this.season = season;
  }

  public boolean simulate() {
    // Simulate the game by randomly generating scores and events
    this.status = GameStatus.IN_PROGRESS;

    // First half
    long firstHalfEndTime = System.currentTimeMillis() + (duration * 1000);
    while (System.currentTimeMillis() < firstHalfEndTime && this.status == GameStatus.IN_PROGRESS) {
      // Simulate random events for the first half
      // Example: generateRandomEvent();

      // Wait 5 seconds between events
      try {
        TimeUnit.SECONDS.sleep(5);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        return false;
      }
    }

    try {
      TimeUnit.SECONDS.sleep(15); // 15 seconds break
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      return false;
    }

    // Second half
    long secondHalfEndTime = System.currentTimeMillis() + (duration * 1000);
    while (System.currentTimeMillis() < secondHalfEndTime && this.status == GameStatus.IN_PROGRESS) {
      // Simulate random events for the second half
      // Example: generateRandomEvent();

      // Wait 5 seconds between events
      try {
        TimeUnit.SECONDS.sleep(5);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        return false;
      }
    }

    // End the game
    this.status = GameStatus.COMPLETED;
    return true;
  }
}
