package com.BettingApp.main;

import com.BettingApp.main.model.User;
import com.BettingApp.main.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTests {

  @Autowired
  private UserRepository userRepository;

  @Test
  void testSaveUser() {
    User user = new User("testUser", "testPassword", "test@example.com");
    User savedUser = userRepository.save(user);

    assertNotNull(savedUser);
    assertNotNull(savedUser.getId());
    assertEquals("testUser", savedUser.getUsername());
  }

  @Test
  void testFindById() {
    User user = new User("testUser", "testPassword", "test@example.com");
    User savedUser = userRepository.save(user);
    Optional<User> foundUser = userRepository.findById(savedUser.getId());
    assertTrue(foundUser.isPresent());
    assertEquals(savedUser.getId(), foundUser.get().getId());
    assertEquals(savedUser.getUsername(), foundUser.get().getUsername());
    assertEquals(savedUser.getEmail(), foundUser.get().getEmail());
    assertEquals(savedUser.getPassword(), foundUser.get().getPassword());

  }

  @Test
  void testFindAll() {
    User user1 = new User("testUser", "testPassword", "test@example.com");
    User user2 = new User("testUser2", "testPassword2", "test2@example.com");

    userRepository.save(user1);
    userRepository.save(user2);

    List<User> users = userRepository.findAll();

    assertNotNull(users);
    assertEquals(2, users.size());
    assertTrue(users.stream().anyMatch(user -> user.getUsername().equals("testUser")));
    assertTrue(users.stream().anyMatch(user -> user.getUsername().equals("testUser2")));
  }
}
