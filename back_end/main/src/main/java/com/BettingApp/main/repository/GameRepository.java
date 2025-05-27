package com.BettingApp.main.repository;

import com.BettingApp.main.model.User;
import com.BettingApp.main.model.AbstractGame;
import com.BettingApp.main.model.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<AbstractGame, Long> {

  Optional<AbstractGame> findById(Long id);

  List<AbstractGame> findAll();

  // Buscar todos os jogos com um status específico
  List<AbstractGame> findByStatus(GameStatus status);

  // // Buscar jogos por atributo e valor
  // List<AbstractGame> findByGameAttributeAndGameValue(String gameAttribute,
  // String gameValue);
}
