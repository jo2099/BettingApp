package com.BettingApp.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BettingApp.main.model.AbstractBet;
import com.BettingApp.main.repository.BetRepository;

@Service
public class BetService {

  @Autowired
  private BetRepository betRepository;

  public AbstractBet saveBet(AbstractBet bet) {
    AbstractBet savedbet = betRepository.save(bet);
    return savedbet;
  }

  public Optional<AbstractBet> findBetById(Long id) {
    return betRepository.findById(id);
  }

}
