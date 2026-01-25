package com.backend.fooddelivery.repository;

import com.backend.fooddelivery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * User Repository for database operations
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if email exists
     */
    Boolean existsByEmail(String email);

    /**
     * Find active user by email
     */
    Optional<User> findByEmailAndIsActiveTrue(String email);
}
