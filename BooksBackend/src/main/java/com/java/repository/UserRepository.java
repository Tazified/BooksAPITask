package com.java.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.java.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
