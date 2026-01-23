package com.backend.fooddelivery.repository;

import com.backend.fooddelivery.model.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Restaurant Repository with custom queries
 */
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    /**
     * Find restaurants by owner ID
     */
    List<Restaurant> findByOwnerId(Long ownerId);

    /**
     * Find active restaurant by ID
     */
    Optional<Restaurant> findByIdAndIsActiveTrue(Long id);

    /**
     * Find all active restaurants
     */
    Page<Restaurant> findByIsActiveTrue(Pageable pageable);

    /**
     * Find restaurants by cuisine type
     */
    Page<Restaurant> findByCuisineTypeAndIsActiveTrue(String cuisineType, Pageable pageable);

    /**
     * Find vegetarian-only restaurants
     */
    Page<Restaurant> findByIsVegetarianOnlyTrueAndIsActiveTrue(Pageable pageable);

    /**
     * Find restaurants by minimum rating
     */
    Page<Restaurant> findByRatingGreaterThanEqualAndIsActiveTrue(Double minRating, Pageable pageable);

    /**
     * Find restaurants by price range
     */
    Page<Restaurant> findByPriceRangeAndIsActiveTrue(Restaurant.PriceRange priceRange, Pageable pageable);

    /**
     * Search restaurants by name
     */
    Page<Restaurant> findByNameContainingIgnoreCaseAndIsActiveTrue(String name, Pageable pageable);

    /**
     * Find nearby restaurants using Haversine formula
     * Distance in kilometers
     */
    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true AND " +
            "(6371 * acos(cos(radians(:latitude)) * cos(radians(r.latitude)) * " +
            "cos(radians(r.longitude) - radians(:longitude)) + " +
            "sin(radians(:latitude)) * sin(radians(r.latitude)))) <= :distance " +
            "ORDER BY (6371 * acos(cos(radians(:latitude)) * cos(radians(r.latitude)) * " +
            "cos(radians(r.longitude) - radians(:longitude)) + " +
            "sin(radians(:latitude)) * sin(radians(r.latitude))))")
    List<Restaurant> findNearbyRestaurants(
            @Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("distance") Double distance);

    /**
     * Find currently open restaurants
     */
    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true AND r.isOpen = true")
    Page<Restaurant> findOpenRestaurants(Pageable pageable);
}
