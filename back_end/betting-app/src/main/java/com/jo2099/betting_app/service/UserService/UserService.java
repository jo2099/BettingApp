package com.jo2099.betting_app.service.UserService;

import java.util.Optional;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jo2099.betting_app.model.User.User;
import com.jo2099.betting_app.repository.UserRepository.UserRepository;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User save(User user) {
    return userRepository.save(user);
  }

  public Optional<User> findById(Long id) {
    return userRepository.findById(id);
  }

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public void delete(User existingUser) {
    userRepository.delete(existingUser);
  }
}
