package com.BettingApp.main;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.BettingApp.main.controller.BetController;
import com.BettingApp.main.model.Bet;
import com.BettingApp.main.model.SoccerBet;
import com.BettingApp.main.model.User;
import com.BettingApp.main.service.BetService;

@WebMvcTest(BetController.class)
class BetControllerTests {

  @Autowired
  MockMvc mockMvc;

  @MockBean
  BetService betService;

  @Test
  void testSaveBet() {
    Bet bet = new SoccerBet();
    User user = new User();

    bet.setId(1L);
    bet.setBetAmount(100.0);
    bet.setBetAttribute("team");
    bet.setBetValue("teamA");
    bet.setBetOutcome("win");
    bet.setUser(user);

    Mockito.when(betService.saveBet(bet)).thenReturn(bet);

  }
}
