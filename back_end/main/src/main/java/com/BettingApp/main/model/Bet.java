package com.BettingApp.main.model;

public interface Bet {
  Long getId();

  Long setId(Long id);

  User getUser();

  void setStatus(String status);

  String getStatus();

  User setUser(User user);

  boolean resolve();

  Double getBetAmount();

  void setBetAmount(Double betAmount);

  String getBetAttribute();

  void setBetAttribute(String betAttribute);

  String getBetValue();

  void setBetValue(String betValue);

  String getBetOutcome();

  void setBetOutcome(String betOutcome);

}
