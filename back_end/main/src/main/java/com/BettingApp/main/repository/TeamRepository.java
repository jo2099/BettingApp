package com.BettingApp.main.repository;

import com.BettingApp.main.model.User;
import com.BettingApp.main.model.AbstractGame;
import com.BettingApp.main.model.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import com.BettingApp.main.model.AbstractTeam;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<AbstractGame, Long> {

  Optional<AbstractGame> findById(Long id);

  List<AbstractGame> findAll();

  // Buscar todos os jogos com um status específico
  // List<AbstractGame> findByStatus(GameStatus status);

  // Buscar jogos por atributo e valor
  // List<AbstractGame> findByGameAttributeAndGameValue(String gameAttribute,
  // String gameValue);
  //
  @Query(value = "SELECT * FROM teams WHERE team_type = :teamType ORDER BY RAND() LIMIT 1", nativeQuery = true)
  Optional<AbstractTeam> getRandomTeam(@Param("teamType") String teamType);

}
