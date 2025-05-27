package com.BettingApp.main;

import com.BettingApp.main.model.AbstractGame;
import com.BettingApp.main.model.SoccerGame;
import com.BettingApp.main.repository.GameRepository;
import com.BettingApp.main.service.GameService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;

class GameServiceTests {
  @Mock
  private GameRepository gameRepository;

  @InjectMocks
  private GameService gameService;

  @BeforeEach
  void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testGenerateAndSimulateGames_SuccessfulSimulation() {
    // Arrange
    AbstractGame mockGame = mock(SoccerGame.class);
    when(mockGame.simulate()).thenReturn(true);
    when(gameRepository.save(mockGame)).thenReturn(mockGame);

    // Act
    gameService.generateAndSimulateGames();

    // Assert
    verify(gameRepository, times(1)).save(any(AbstractGame.class));
  }

  @Test
  void testGenerateAndSimulateGames_FailedSimulation() {
    // Arrange
    AbstractGame mockGame = mock(SoccerGame.class);
    when(mockGame.simulate()).thenReturn(false);

    GameService spyGameService = spy(gameService);
    doReturn(mockGame).when(spyGameService).createRandomGame();

    // Act
    spyGameService.generateAndSimulateGames();

    // Assert
    verify(gameRepository, never()).save(any(AbstractGame.class));
  }
}
