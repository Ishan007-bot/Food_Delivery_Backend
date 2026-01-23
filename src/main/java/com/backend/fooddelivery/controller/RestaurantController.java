package com.backend.fooddelivery.controller;

import com.backend.fooddelivery.dto.request.CreateRestaurantRequest;
import com.backend.fooddelivery.dto.request.UpdateRestaurantRequest;
import com.backend.fooddelivery.dto.response.RestaurantResponse;
import com.backend.fooddelivery.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Restaurant Controller - Handles restaurant management operations
 */
@RestController
@RequestMapping("/api/restaurants")
@Tag(name = "Restaurant Management", description = "Restaurant CRUD and search APIs")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    /**
     * Get all restaurants (Public)
     */
    @GetMapping
    @Operation(summary = "Get all restaurants", description = "Get paginated list of all active restaurants")
    public ResponseEntity<Page<RestaurantResponse>> getAllRestaurants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "rating") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<RestaurantResponse> restaurants = restaurantService.getAllRestaurants(pageable);

        return ResponseEntity.ok(restaurants);
    }

    /**
     * Get restaurant by ID (Public)
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get restaurant by ID", description = "Get restaurant details by ID")
    public ResponseEntity<RestaurantResponse> getRestaurantById(@PathVariable Long id) {
        RestaurantResponse restaurant = restaurantService.getRestaurantById(id);
        return ResponseEntity.ok(restaurant);
    }

    /**
     * Search restaurants by name (Public)
     */
    @GetMapping("/search")
    @Operation(summary = "Search restaurants", description = "Search restaurants by name")
    public ResponseEntity<Page<RestaurantResponse>> searchRestaurants(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<RestaurantResponse> restaurants = restaurantService.searchRestaurants(name, pageable);

        return ResponseEntity.ok(restaurants);
    }

    /**
     * Get restaurants by cuisine (Public)
     */
    @GetMapping("/cuisine/{cuisineType}")
    @Operation(summary = "Get restaurants by cuisine", description = "Filter restaurants by cuisine type")
    public ResponseEntity<Page<RestaurantResponse>> getRestaurantsByCuisine(
            @PathVariable String cuisineType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("rating").descending());
        Page<RestaurantResponse> restaurants = restaurantService.getRestaurantsByCuisine(cuisineType, pageable);

        return ResponseEntity.ok(restaurants);
    }

    /**
     * Get vegetarian restaurants (Public)
     */
    @GetMapping("/vegetarian")
    @Operation(summary = "Get vegetarian restaurants", description = "Get vegetarian-only restaurants")
    public ResponseEntity<Page<RestaurantResponse>> getVegetarianRestaurants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("rating").descending());
        Page<RestaurantResponse> restaurants = restaurantService.getVegetarianRestaurants(pageable);

        return ResponseEntity.ok(restaurants);
    }

    /**
     * Get restaurants by minimum rating (Public)
     */
    @GetMapping("/rating/{minRating}")
    @Operation(summary = "Get restaurants by rating", description = "Filter restaurants by minimum rating")
    public ResponseEntity<Page<RestaurantResponse>> getRestaurantsByRating(
            @PathVariable Double minRating,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("rating").descending());
        Page<RestaurantResponse> restaurants = restaurantService.getRestaurantsByRating(minRating, pageable);

        return ResponseEntity.ok(restaurants);
    }

    /**
     * Get restaurants by price range (Public)
     */
    @GetMapping("/price/{priceRange}")
    @Operation(summary = "Get restaurants by price range", description = "Filter restaurants by price range (LOW, MEDIUM, HIGH)")
    public ResponseEntity<Page<RestaurantResponse>> getRestaurantsByPriceRange(
            @PathVariable String priceRange,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("rating").descending());
        Page<RestaurantResponse> restaurants = restaurantService.getRestaurantsByPriceRange(priceRange, pageable);

        return ResponseEntity.ok(restaurants);
    }

    /**
     * Get nearby restaurants (Public)
     */
    @GetMapping("/nearby")
    @Operation(summary = "Get nearby restaurants", description = "Find restaurants within specified distance from location")
    public ResponseEntity<List<RestaurantResponse>> getNearbyRestaurants(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "5.0") Double distance) {

        List<RestaurantResponse> restaurants = restaurantService.getNearbyRestaurants(latitude, longitude, distance);
        return ResponseEntity.ok(restaurants);
    }

    /**
     * Get currently open restaurants (Public)
     */
    @GetMapping("/open")
    @Operation(summary = "Get open restaurants", description = "Get currently open restaurants")
    public ResponseEntity<Page<RestaurantResponse>> getOpenRestaurants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("rating").descending());
        Page<RestaurantResponse> restaurants = restaurantService.getOpenRestaurants(pageable);

        return ResponseEntity.ok(restaurants);
    }

    /**
     * Create restaurant (Admin or Restaurant Owner)
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create restaurant", description = "Create new restaurant (Admin or Restaurant Owner)")
    public ResponseEntity<RestaurantResponse> createRestaurant(@Valid @RequestBody CreateRestaurantRequest request) {
        RestaurantResponse restaurant = restaurantService.createRestaurant(request);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    /**
     * Update restaurant (Owner or Admin)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update restaurant", description = "Update restaurant details (Owner or Admin)")
    public ResponseEntity<RestaurantResponse> updateRestaurant(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRestaurantRequest request) {
        RestaurantResponse restaurant = restaurantService.updateRestaurant(id, request);
        return ResponseEntity.ok(restaurant);
    }

    /**
     * Upload restaurant logo (Owner or Admin)
     */
    @PostMapping("/{id}/logo")
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Upload restaurant logo", description = "Upload logo for restaurant (Owner or Admin)")
    public ResponseEntity<RestaurantResponse> uploadLogo(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        RestaurantResponse restaurant = restaurantService.uploadLogo(id, file);
        return ResponseEntity.ok(restaurant);
    }

    /**
     * Delete restaurant (Admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Delete restaurant", description = "Soft delete restaurant (Admin only)")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get my restaurants (Restaurant Owner)
     */
    @GetMapping("/my-restaurants")
    @PreAuthorize("hasRole('RESTAURANT_OWNER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Get my restaurants", description = "Get all restaurants owned by current user")
    public ResponseEntity<List<RestaurantResponse>> getMyRestaurants() {
        List<RestaurantResponse> restaurants = restaurantService.getMyRestaurants();
        return ResponseEntity.ok(restaurants);
    }
}
