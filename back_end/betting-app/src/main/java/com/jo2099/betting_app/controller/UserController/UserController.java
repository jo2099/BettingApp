package com.jo2099.betting_app.controller.UserController;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jo2099.betting_app.model.User.User;
import com.jo2099.betting_app.service.UserService.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.findAll();
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    return userService.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<User> createUser(User user) {
    User savedUser = userService.save(user);
    return ResponseEntity.ok(savedUser);
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, User user) {
    return userService.findById(id)
        .map(existingUser -> {
          existingUser.setUsername(user.getUsername());
          existingUser.setEmail(user.getEmail());
          existingUser.setPassword(user.getPassword());
          User updatedUser = userService.save(existingUser);
          return ResponseEntity.ok(updatedUser);
        })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
    return userService.findById(id)
        .map(existingUser -> {
          userService.delete(existingUser);
          return ResponseEntity.noContent().build();
        })
        .orElse(ResponseEntity.notFound().build());
  }

}
