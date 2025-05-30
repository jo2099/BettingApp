
package com.BettingApp.main.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.BettingApp.main.util.Publisher;
import com.BettingApp.main.util.Event;
import com.BettingApp.main.util.Subscriber;

@Entity
@Table(name = "games")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "game_type", discriminatorType = DiscriminatorType.STRING)
public abstract class AbstractGame implements Publisher<Event> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Transient
  GameStatus status = GameStatus.PENDING;

  @ManyToOne
  @JoinColumn(name = "home_team_id", nullable = false)
  private AbstractTeam homeTeam;
  @ManyToOne
  @JoinColumn(name = "away_team_id", nullable = false)
  private AbstractTeam awayTeam;

  @Transient
  private java.util.List<Subscriber<Event>> subscribers = new java.util.ArrayList<>();

  public AbstractGame() {
    // Default constructor
  }

  public AbstractGame(AbstractTeam homeTeam, AbstractTeam awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public AbstractTeam getHomeTeam() {
    return homeTeam;
  }

  public void setHomeTeam(AbstractTeam team) {
    this.homeTeam = team;
  }

  public AbstractTeam getAwayTeam() {
    return awayTeam;
  }

  public void setAwayTeam(AbstractTeam awayTeam) {
    this.awayTeam = awayTeam;
  }

  public abstract boolean simulate();

  @Override
  public void publish(Event item) {
    for (Subscriber<Event> subscriber : subscribers) {
      subscriber.receive(item);
    }
  }

  @Override
  public void subscribe(Subscriber<Event> subscriber) {
    subscribers.add(subscriber);
  }

  @Override
  public void unsubscribe(Subscriber<Event> subscriber) {
    subscribers.remove(subscriber);
  }

}
