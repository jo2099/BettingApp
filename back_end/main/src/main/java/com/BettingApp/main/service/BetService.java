package com.BettingApp.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BettingApp.main.model.Bet;
import com.BettingApp.main.repository.BetRepository;

@Service
public class BetService {

  @Autowired
  private BetRepository betRepository;

  public Bet saveBet(Bet bet) {

    return bet;
  }

}
