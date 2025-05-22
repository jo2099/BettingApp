package com.BettingApp.main;

import com.BettingApp.main.model.User;
import com.BettingApp.main.service.UserService;
import com.BettingApp.main.controller.UserController;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
}
