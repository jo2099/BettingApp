package com.BettingApp.main.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SOCCER")
public class SoccerTeam extends AbstractTeam {

  private String league;
  private String season;

  public SoccerTeam() {
    // Default constructor
  }

  public SoccerTeam(String name, String league, String season) {
    super(name);
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
}
