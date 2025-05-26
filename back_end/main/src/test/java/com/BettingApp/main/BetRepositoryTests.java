package com.BettingApp.main;

import com.BettingApp.main.model.AbstractBet;
import com.BettingApp.main.model.SoccerBet;
import com.BettingApp.main.model.User;
import com.BettingApp.main.repository.BetRepository;
import com.BettingApp.main.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class BetRepositoryTest {

  @Autowired
  private BetRepository betRepository;

  @Autowired
  private UserRepository userRepository;

  @Test
  void testSaveAndFindBet() {
    User user = new User("testUser", "testPassword", "test@example.com");
    AbstractBet bet = new SoccerBet();
    userRepository.save(user);
    bet.setBetAmount(100.0);
    bet.setBetAttribute("score");
    bet.setBetValue("3x2");
    bet.setStatus("em espera");
    bet.setUser(user);

    // Save the bet
    AbstractBet savedBet = betRepository.save(bet);

    // Find the bet by ID
    AbstractBet foundBet = betRepository.findById(savedBet.getId()).orElse(null);

    assertNotNull(foundBet);
    assertEquals(bet.getBetAmount(), foundBet.getBetAmount());
    assertEquals(bet.getBetAttribute(), foundBet.getBetAttribute());
    assertEquals(bet.getBetValue(), foundBet.getBetValue());
    assertEquals(bet.getStatus(), foundBet.getStatus());
  }

  @Test
  void testFindAllBets() {
    // Create and save a user
    User user = new User("testUser", "testPassword", "test@example.com");
    userRepository.save(user);

    // Create two SoccerBets and associate them with the user
    AbstractBet bet1 = new SoccerBet();
    bet1.setUser(user); // Associate the user
    bet1.setBetAmount(100.0);
    bet1.setBetAttribute("score");
    bet1.setBetValue("3x2");
    bet1.setStatus("em espera");

    AbstractBet bet2 = new SoccerBet();
    bet2.setUser(user); // Associate the user
    bet2.setBetAmount(200.0);
    bet2.setBetAttribute("score");
    bet2.setBetValue("2x1");
    bet2.setStatus("em espera");

    // Save the bets
    betRepository.save(bet1);
    betRepository.save(bet2);

    // Find all bets
    List<AbstractBet> bets = betRepository.findAll();

    assertNotNull(bets);
    assertEquals(2, bets.size());
  }

}
