package com.BettingApp.main;

import com.BettingApp.main.model.Bet;
import com.BettingApp.main.repository.BetRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class SoccerBetRepositoryTest {

  @Autowired
  private BetRepository betRepository;

}
