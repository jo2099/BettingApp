package com.BettingApp.main;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.BettingApp.main.controller.UserController;
import com.BettingApp.main.model.AbstractBet;
import com.BettingApp.main.model.SoccerBet;
import com.BettingApp.main.model.User;
import com.BettingApp.main.service.UserService;

@WebMvcTest(UserController.class)
class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  // TODO
  // substituir por outra coisa(MockBean deprecated)
  @MockBean
  private UserService userService;

  @Test
  void testGetAllUsers() throws Exception {
    User user1 = new User("user1", "password1", "test1@example.com");
    User user2 = new User("user2", "password2", "test2@example.com");

    when(userService.findAllUsers()).thenReturn(Arrays.asList(user1, user2));

    mockMvc.perform(get("/api/users"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$[0].username").value("user1"))
        .andExpect(jsonPath("$[1].username").value("user2"));

    verify(userService, times(1)).findAllUsers();
  }

  @Test
  void testGetUserById() throws Exception {
    User user = new User("user1", "password1", "user1@example.com");
    user.setId(1L);

    when(userService.findUserById(1L)).thenReturn(Optional.of(user));

    mockMvc.perform(get("/api/users/1")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value("user1"))
        .andExpect(jsonPath("$.email").value("user1@example.com"));

    verify(userService, times(1)).findUserById(1L);
  }

  @Test
  void testSaveUser() throws Exception {
    User user = new User("user1", "password1", "user1@example.com");

    when(userService.saveUser(any(User.class))).thenReturn(user);

    mockMvc.perform(post("/api/users")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\"username\":\"user1\",\"password\":\"password1\",\"email\":\"user1@example.com\"}"))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.username").value("user1"))
        .andExpect(jsonPath("$.email").value("user1@example.com"));

    verify(userService, times(1)).saveUser(any(User.class));
  }

  @Test
  void testDeleteUser() throws Exception {
    doNothing().when(userService).deleteUserById(1L);

    mockMvc.perform(delete("/api/users/1")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNoContent());

    verify(userService, times(1)).deleteUserById(1L);
  }

  @Test
  void getUserBets() throws Exception {
    User user = new User("user1", "password1", "user1@example.com");
    user.setId(1L);

    List<AbstractBet> bets = Arrays.asList(
        new SoccerBet() {
          {
            setId(1L);
            setUser(user);
            setBetAmount(100.0);
            setBetAttribute("score");
            setBetValue("3x2");
            setStatus("em espera");
          }
        },
        new SoccerBet() {
          {
            setId(2L);
            setUser(user);
            setBetAmount(200.0);
            setBetAttribute("score");
            setBetValue("2x1");
            setStatus("ganhou");
          }
        });

    when(userService.findAllUserBets(1L)).thenReturn(Optional.of(bets));

    mockMvc.perform(get("/api/users/1/bets")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].id").value(1L))
        .andExpect(jsonPath("$[0].betAmount").value(100.0))
        .andExpect(jsonPath("$[0].betAttribute").value("score"))
        .andExpect(jsonPath("$[0].betValue").value("3x2"))
        .andExpect(jsonPath("$[0].status").value("em espera"))
        .andExpect(jsonPath("$[1].id").value(2L))
        .andExpect(jsonPath("$[1].betAmount").value(200.0))
        .andExpect(jsonPath("$[1].betAttribute").value("score"))
        .andExpect(jsonPath("$[1].betValue").value("2x1"))
        .andExpect(jsonPath("$[1].status").value("ganhou"));

  }
}
