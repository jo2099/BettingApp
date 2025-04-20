
package com.jo2099.betting_app.utils;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class SqlCommandRunner implements CommandLineRunner {

  private final JdbcTemplate jdbcTemplate;

  public SqlCommandRunner(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public void run(String... args) throws Exception {
    // Exemplo de comando SQL
    String sql = "INSERT INTO users (username, email, password) VALUES ('admin', 'admin@example.com', 'admin123')";
    // jdbcTemplate.execute(sql);
    // System.out.println("Comando SQL executado com sucesso!");
  }
}
