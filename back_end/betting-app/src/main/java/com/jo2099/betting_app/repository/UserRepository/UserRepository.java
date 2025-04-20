package com.jo2099.betting_app.repository.UserRepository;

import com.jo2099.betting_app.model.User.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Boolean existsByEmail(String email);
}
