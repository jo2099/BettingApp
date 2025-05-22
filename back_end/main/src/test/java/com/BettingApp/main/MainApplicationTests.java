package com.BettingApp.main;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;
import com.BettingApp.main.model.User;

@SpringBootTest
class MainApplicationTests {

  @Test
  void contextLoads() {
  }

  @Test
  void testUserAtributes() {
    User user = new User();
    user.setId(1L);
    user.setUsername("testUser");
    user.setPassword("testPassword");
    user.setEmail("test@example.com");
    user.setPassword("hashedPassword");

    assertEquals(1L, user.getId());
    assertEquals("testUser", user.getUsername());
    assertEquals("test@example.com", user.getEmail());
    assertEquals("hashedPassword", user.getPassword());

  }

}
