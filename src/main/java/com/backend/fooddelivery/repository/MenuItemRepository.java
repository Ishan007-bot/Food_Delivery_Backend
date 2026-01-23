package com.backend.fooddelivery.repository;

import com.backend.fooddelivery.model.MenuItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * MenuItem Repository with custom queries
 */
@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    /**
     * Find menu items by restaurant ID
     */
    List<MenuItem> findByRestaurantIdAndIsActiveTrue(Long restaurantId);

    /**
     * Find available menu items by restaurant ID
     */
    List<MenuItem> findByRestaurantIdAndIsActiveTrueAndIsAvailableTrue(Long restaurantId);

    /**
     * Find menu item by ID and restaurant ID
     */
    Optional<MenuItem> findByIdAndRestaurantId(Long id, Long restaurantId);

    /**
     * Find active menu item by ID
     */
    Optional<MenuItem> findByIdAndIsActiveTrue(Long id);

    /**
     * Find menu items by category
     */
    Page<MenuItem> findByRestaurantIdAndCategoryAndIsActiveTrue(
            Long restaurantId, MenuItem.Category category, Pageable pageable);

    /**
     * Find menu items by dietary tag
     */
    Page<MenuItem> findByRestaurantIdAndDietaryTagAndIsActiveTrue(
            Long restaurantId, MenuItem.DietaryTag dietaryTag, Pageable pageable);

    /**
     * Find menu items by price range
     */
    Page<MenuItem> findByRestaurantIdAndPriceBetweenAndIsActiveTrue(
            Long restaurantId, Double minPrice, Double maxPrice, Pageable pageable);

    /**
     * Search menu items by name
     */
    Page<MenuItem> findByRestaurantIdAndNameContainingIgnoreCaseAndIsActiveTrue(
            Long restaurantId, String name, Pageable pageable);

    /**
     * Find popular menu items (top ordered)
     */
    @Query("SELECT m FROM MenuItem m WHERE m.restaurantId = :restaurantId AND m.isActive = true " +
            "ORDER BY m.orderCount DESC")
    List<MenuItem> findPopularMenuItems(Long restaurantId, Pageable pageable);

    /**
     * Search across all restaurants
     */
    Page<MenuItem> findByNameContainingIgnoreCaseAndIsActiveTrue(String name, Pageable pageable);
}
