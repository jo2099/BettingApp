package com.BettingApp.main;

import com.BettingApp.main.model.AbstractBet;
import com.BettingApp.main.model.SoccerBet;
import com.BettingApp.main.repository.BetRepository;
import com.BettingApp.main.service.BetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BetServiceTests {

  @Mock
  private BetRepository betRepository;

  @InjectMocks
  private BetService betService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testSaveBet() {
    AbstractBet bet = new SoccerBet();
    when(betRepository.save(bet)).thenReturn(bet);

    AbstractBet savedBet = betService.saveBet(bet);
    assertNotNull(savedBet);
    assertEquals(bet, savedBet);
    verify(betRepository, times(1)).save(bet);
  }

  @Test
  void findBetById() {
    AbstractBet bet = new SoccerBet();
    bet.setId(1L);
    when(betRepository.findById(1L)).thenReturn(Optional.of(bet));
    Optional<AbstractBet> foundBet = betService.findBetById(1l);
    assertTrue(foundBet.isPresent());
    assertEquals(bet, foundBet.get());

    Optional<AbstractBet> not_found_bet = betService.findBetById(2L);
    assertFalse(not_found_bet.isPresent());

  }
}
