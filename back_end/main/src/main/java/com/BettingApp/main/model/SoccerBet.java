package com.BettingApp.main.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SOCCER")
public class SoccerBet extends AbstractBet {

  public boolean resolve() {
    if (getStatus() == "em espera") {
      return false;
    } else if (getStatus() == "ganhou") {
      return true;
    }
    return false;
  }

}
