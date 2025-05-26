package com.BettingApp.main;

import com.BettingApp.main.model.AbstractBet;
import com.BettingApp.main.model.SoccerBet;
import com.BettingApp.main.model.User;
import com.BettingApp.main.repository.UserRepository;
import com.BettingApp.main.service.BetService;
import com.BettingApp.main.service.UserService;
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

class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private BetService betService;

  @InjectMocks
  private UserService userService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testSaveUser() {
    User user = new User("testUser", "testPassword", "test@example.com");
    when(userRepository.save(user)).thenReturn(user);

    User savedUser = userService.saveUser(user);

    assertNotNull(savedUser);
    assertEquals("testUser", savedUser.getUsername());
    verify(userRepository, times(1)).save(user);
  }

  @Test
  void testFindUserById() {
    User user = new User("testUser", "testPassword", "test@example.com");
    user.setId(1L);
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));

    Optional<User> foundUser = userService.findUserById(1L);

    assertTrue(foundUser.isPresent());
    assertEquals("testUser", foundUser.get().getUsername());
    verify(userRepository, times(1)).findById(1L);
  }

  @Test
  void testFindAllUsers() {
    User user1 = new User("testUser1", "testPassword1", "test1@example.com");
    User user2 = new User("testUser2", "testPassword2", "test2@example.com");
    when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

    List<User> users = userService.findAllUsers();

    assertNotNull(users);
    assertEquals(2, users.size());
    verify(userRepository, times(1)).findAll();
  }

  @Test
  void testDeleteUserById() {
    Long userId = 1L;

    userService.deleteUserById(userId);

    verify(userRepository, times(1)).deleteById(userId);
  }

  @Test
  void testUpdateUser() {
    User user = new User("testUser", "testPassword", "test@example.com");
    user.setId(1L);
    when(userRepository.save(user)).thenReturn(user);

    userService.updateUser(user);

    verify(userRepository, times(1)).save(user);
  }

  @Test
  void testGetUserFromBetId() {
    // Arrange
    Long betId = 1L;
    User user = new User("testUser", "testPassword", "test@example.com");
    AbstractBet bet = mock(AbstractBet.class);
    when(bet.getUser()).thenReturn(user);
    when(betService.findBetById(betId)).thenReturn(Optional.of(bet));

    // Act
    User result = userService.getUserFromBetId(betId);

    // Assert
    assertNotNull(result);
    assertEquals("testUser", result.getUsername());
    verify(betService, times(1)).findBetById(betId);
  }

  @Test
  void testGetUserBets() {
    Long userId = 1L;
    User user = new User();
    user.setId(userId);
    List<AbstractBet> bets = Arrays.asList(new SoccerBet(), new SoccerBet());
    user.setBets(bets);

    when(userRepository.findById(userId)).thenReturn(Optional.of(user));
    Optional<List<AbstractBet>> userBets = userService.findAllUserBets(userId);
    assertTrue(userBets.isPresent());
    assertEquals(2, userBets.get().size());
    assertEquals(bets, userBets.get());
    verify(userRepository, times(1)).findById(userId);
  }

}
