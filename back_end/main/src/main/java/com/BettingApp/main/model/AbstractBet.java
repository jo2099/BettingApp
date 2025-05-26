
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

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = SoccerBet.class, name = "soccer")
// @JsonSubTypes.Type(value = BasketballBet.class, name = "basketball"),
})
@Entity
@Table(name = "bets")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "bet_type", discriminatorType = DiscriminatorType.STRING)
public abstract class AbstractBet implements Bet {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @JsonProperty("betAmount")
  private Double betAmount;
  private String betAttribute;

  private String betValue;
  private String betOutcome;

  private String status;

  public Long getId() {
    return id;
  }

  @Override
  public Long setId(Long id) {
    this.id = id;
    return id;
  }

  public User getUser() {
    return user;
  }

  public User setUser(User user) {
    this.user = user;
    return user;
  }

  public Double getBetAmount() {
    return betAmount;
  }

  public void setBetAmount(Double betAmount) {
    this.betAmount = betAmount;
  }

  public String getBetAttribute() {
    return betAttribute;
  }

  public void setBetAttribute(String betAttribute) {
    this.betAttribute = betAttribute;
  }

  public String getBetValue() {
    return betValue;
  }

  public void setBetValue(String betValue) {
    this.betValue = betValue;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getBetOutcome() {
    return betOutcome;
  }

  public void setBetOutcome(String betOutcome) {
    this.betOutcome = betOutcome;
  }

}
