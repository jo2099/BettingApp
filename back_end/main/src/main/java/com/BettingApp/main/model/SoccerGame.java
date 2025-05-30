package com.BettingApp.main.model;

import java.util.concurrent.TimeUnit;

import com.BettingApp.main.model.GameStatus;
import com.BettingApp.main.model.AbstractTeam;
import com.BettingApp.main.util.Event;
import com.BettingApp.main.util.Publisher;
import com.BettingApp.main.model.GameEvent;

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
  private Long duration; // Duration in seconds for each half
  private Long interval_duration = 15L; // Interval duration in seconds

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

  public int getHomeScore() {
    return homeScore;
  }

  public void setHomeScore(int homeScore) {
    this.homeScore = homeScore;
  }

  public int getAwayScore() {
    return awayScore;
  }

  public void setAwayScore(int awayScore) {
    this.awayScore = awayScore;
  }

  public int getNumYellows() {
    return numYellows;
  }

  public void setNumYellows(int numYellows) {
    this.numYellows = numYellows;
  }

  public int getNumReds() {
    return numReds;
  }

  public void setNumReds(int numReds) {
    this.numReds = numReds;
  }

  public GameStatus getStatus() {
    return status;
  }

  public void setStatus(GameStatus status) {
    this.status = status;
  }

  public Long getDuration() {
    return duration;
  }

  public void setDuration(Long duration) {
    this.duration = duration;
  }

  public Long getIntervalDuration() {
    return interval_duration;
  }

  public void setIntervalDuration(Long interval_duration) {
    this.interval_duration = interval_duration;
  }

  public GameEvent generateRandomEvent() {
    GameEvent event = new GameEvent(this, "Goal");

    return event;

  }

  public boolean simulate() {
    // Simulate the game by randomly generating scores and events
    this.status = GameStatus.IN_PROGRESS;

    // First half
    long firstHalfEndTime = System.currentTimeMillis() + (duration * 1000);
    while (System.currentTimeMillis() < firstHalfEndTime && this.status == GameStatus.IN_PROGRESS) {
      // Simulate random events for the first half
      // Example: generateRandomEvent();
      Event event = generateRandomEvent();
      this.publish(event); // Publish the event to subscribers
      // Notify clients about the event

      // Wait 5 seconds between events
      try {
        TimeUnit.SECONDS.sleep(5);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        return false;
      }
    }

    try {
      TimeUnit.SECONDS.sleep(interval_duration); // 15 seconds break
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
