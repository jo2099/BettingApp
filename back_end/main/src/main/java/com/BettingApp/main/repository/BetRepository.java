package com.BettingApp.main.repository;

import com.BettingApp.main.model.User;
import com.BettingApp.main.model.AbstractBet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BetRepository extends JpaRepository<AbstractBet, Long> {

  Optional<AbstractBet> findById(Long id);

  List<AbstractBet> findAll();

  // Buscar todas as apostas de um usuário específico
  List<AbstractBet> findByUser(User user);

  // Buscar todas as apostas com um status específico
  List<AbstractBet> findByStatus(String status);

  // Buscar apostas por atributo e valor
  List<AbstractBet> findByBetAttributeAndBetValue(String betAttribute, String betValue);

}
