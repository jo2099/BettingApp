package com.BettingApp.main;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.BettingApp.main.controller.BetController;
import com.BettingApp.main.model.AbstractBet;
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
  void testSaveBet() throws Exception {
    AbstractBet bet = new SoccerBet();
    User user = new User();
    bet.setUser(user);
    bet.setBetAmount(100.0); // Ensure this is set
    bet.setBetAttribute("score");
    bet.setBetValue("3x2");
    bet.setStatus("em espera");
    bet.setId(1L);

    when(betService.saveBet(bet)).thenReturn(bet);

    mockMvc.perform(post("/api/bets")
        .contentType(MediaType.APPLICATION_JSON)
        .content(
            "{\"type\": \"soccer\", \"user\": {\"id\": 1}, \"betAmount\": 100.0, \"betAttribute\": \"score\", \"betValue\": \"3x2\", \"status\": \"em espera\"}")
        .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.betAmount").value(100.0)) // This should now pass
        .andExpect(jsonPath("$.betAttribute").value("score"))
        .andExpect(jsonPath("$.betValue").value("3x2"))
        .andExpect(jsonPath("$.status").value("em espera"));
  }

  @Test
  void getBetbyId() throws Exception {
    Long betId = 1L;
    AbstractBet bet = new SoccerBet();
    bet.setId(betId);
    bet.setBetAmount(100.0);
    bet.setBetAttribute("score");
    bet.setBetValue("3x2");
    bet.setStatus("em espera");
    bet.setUser(new User());

    when(betService.findBetById(betId)).thenReturn(java.util.Optional.of(bet));
    mockMvc.perform(get("/api/bets/{id}", betId)
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.betAmount").value(100.0))
        .andExpect(jsonPath("$.betAttribute").value("score"))
        .andExpect(jsonPath("$.betValue").value("3x2"))
        .andExpect(jsonPath("$.status").value("em espera"));
  }

}
