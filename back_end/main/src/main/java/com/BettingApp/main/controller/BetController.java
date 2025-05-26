
package com.BettingApp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BettingApp.main.model.AbstractBet;
import com.BettingApp.main.service.BetService;

@RestController
@RequestMapping("/api/bets")
public class BetController {

  @Autowired
  private BetService betService;

  @GetMapping("/{id}")
  public ResponseEntity<AbstractBet> getBetById(@PathVariable Long id) {
    return betService.findBetById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<AbstractBet> saveBet(@RequestBody AbstractBet bet) {
    return ResponseEntity.status(201).body(bet);
  }

}
