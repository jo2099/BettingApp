package com.BettingApp.main.controller;

import com.BettingApp.main.model.AbstractBet;
import com.BettingApp.main.model.User;
import com.BettingApp.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.findAllUsers();
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    Optional<User> user = userService.findUserById(id);
    return user.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<?> createUser(@RequestBody User user) {
    try {
      User savedUser = userService.saveUser(user);
      return ResponseEntity.status(201).body(savedUser);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(409).body("Email already in use");
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
    user.setId(id);
    userService.updateUser(user);
    return ResponseEntity.ok(user);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUserById(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}/bets")
  public ResponseEntity<List<AbstractBet>> getUserBets(@PathVariable Long id) {
    Optional<List<AbstractBet>> bets = userService.findAllUserBets(id);
    return bets.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/login")
  public ResponseEntity<User> loginUser(@RequestParam String email, @RequestParam String password) {
    Optional<User> user = userService.findUserByEmail(email);
    if (user.isPresent() && user.get().getPassword().equals(password)) {
      return ResponseEntity.ok(user.get());
    } else {
      return ResponseEntity.status(401).body(null);
    }
  }
}
