package com.BettingApp.main.service;

import com.BettingApp.main.model.AbstractBet;
import com.BettingApp.main.model.User;
import com.BettingApp.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private BetService betService;

  @Autowired
  public UserService(UserRepository userRepository, BetService betService) {
    this.userRepository = userRepository;
    this.betService = betService;
  }

  public User saveUser(User user) {
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
      throw new IllegalArgumentException("Email already in use");
    }
    return userRepository.save(user);
  }

  public Optional<User> findUserById(Long id) {
    return userRepository.findById(id);
  }

  public Optional<User> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public List<User> findAllUsers() {
    return userRepository.findAll();
  }

  public void deleteUserById(Long id) {
    userRepository.deleteById(id);
  }

  public void updateUser(User user) {
    userRepository.save(user);
  }

  public User getUserFromBetId(Long betId) {
    return betService.findBetById(betId)
        .map(bet -> bet.getUser())
        .orElse(null);
  }

  public Optional<List<AbstractBet>> findAllUserBets(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    return Optional.ofNullable(user.getBets());
  }

  public Long getUserCoins(User user) {
    if (user == null) {
      throw new IllegalArgumentException("User cannot be null");
    }
    return user.getCoins();
  }

}
