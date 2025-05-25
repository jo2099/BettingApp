package com.BettingApp.main;

import com.BettingApp.main.model.SoccerBet;
import com.BettingApp.main.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SoccerBetTests {

  private SoccerBet soccerBet;
  private User mockUser;

  @BeforeEach
  void setUp() {
    soccerBet = new SoccerBet();
    mockUser = mock(User.class);
  }

  @Test
  void testSetAndGetId() {
    Long id = 1L;
    soccerBet.setId(id);
    assertEquals(id, soccerBet.getId());
  }

  @Test
  void testSetAndGetUser() {
    soccerBet.setUser(mockUser);
    assertEquals(mockUser, soccerBet.getUser());
  }

  @Test
  void testSetAndGetBetAmount() {
    Double betAmount = 100.0;
    soccerBet.setBetAmount(betAmount);
    assertEquals(betAmount, soccerBet.getBetAmount());
  }

  @Test
  void testSetAndGetBetAttribute() {
    String betAttribute = "score";
    soccerBet.setBetAttribute(betAttribute);
    assertEquals(betAttribute, soccerBet.getBetAttribute());
  }

  @Test
  void testSetAndGetBetValue() {
    String betValue = "3x2";
    soccerBet.setBetValue(betValue);
    assertEquals(betValue, soccerBet.getBetValue());
  }

  @Test
  void testSetAndGetStatus() {
    String status = "em espera";
    soccerBet.setStatus(status);
    assertEquals(status, soccerBet.getStatus());
  }

  @Test
  void testResolveBet() {
    soccerBet.setStatus("em espera");
    boolean result = soccerBet.resolve();
    assertFalse(result);

    soccerBet.setStatus("ganhou");
    result = soccerBet.resolve();
    assertTrue(result);
  }
}
