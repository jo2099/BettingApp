package com.BettingApp.main;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;
import com.BettingApp.main.model.User;

@SpringBootTest
@EntityScan(basePackages = "com.BettingApp.main")
class MainApplicationTests {

  @Test
  void contextLoads() {
  }

}
