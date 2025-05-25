
package com.BettingApp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BettingApp.main.service.BetService;

@RestController
@RequestMapping("/api/bets")
public class BetController {

  @Autowired
  private BetService betService;

}
