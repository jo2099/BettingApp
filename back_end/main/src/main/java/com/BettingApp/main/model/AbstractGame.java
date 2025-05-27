
package com.BettingApp.main.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "games")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "game_type", discriminatorType = DiscriminatorType.STRING)
public abstract class AbstractGame {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private AbstractTeam homeTeam;
  private AbstractTeam awayTeam;

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

  public void setHomeTeam(AbstractTeam homeTeam) {
    this.homeTeam = homeTeam;
  }

  public AbstractTeam getAwayTeam() {
    return awayTeam;
  }

  public void setAwayTeam(AbstractTeam awayTeam) {
    this.awayTeam = awayTeam;
  }

  public abstract boolean simulate();

}
