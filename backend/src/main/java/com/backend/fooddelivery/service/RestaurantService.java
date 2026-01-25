package com.backend.fooddelivery.service;

import com.backend.fooddelivery.dto.request.CreateRestaurantRequest;
import com.backend.fooddelivery.dto.request.UpdateRestaurantRequest;
import com.backend.fooddelivery.dto.response.RestaurantResponse;
import com.backend.fooddelivery.exception.BadRequestException;
import com.backend.fooddelivery.exception.ResourceNotFoundException;
import com.backend.fooddelivery.model.Restaurant;
import com.backend.fooddelivery.model.User;
import com.backend.fooddelivery.repository.RestaurantRepository;
import com.backend.fooddelivery.repository.UserRepository;
import com.backend.fooddelivery.util.RestaurantMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Restaurant Service - Handles restaurant management operations
 */
@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileUploadService fileUploadService;

    /**
     * Get all active restaurants with pagination
     */
    public Page<RestaurantResponse> getAllRestaurants(Pageable pageable) {
        return restaurantRepository.findByIsActiveTrue(pageable)
                .map(RestaurantMapper::toRestaurantResponse);
    }

    /**
     * Get restaurant by ID
     */
    public RestaurantResponse getRestaurantById(Long id) {
        Restaurant restaurant = restaurantRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
        return RestaurantMapper.toRestaurantResponse(restaurant);
    }

    /**
     * Search restaurants by name
     */
    public Page<RestaurantResponse> searchRestaurants(String name, Pageable pageable) {
        return restaurantRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(name, pageable)
                .map(RestaurantMapper::toRestaurantResponse);
    }

    /**
     * Filter restaurants by cuisine
     */
    public Page<RestaurantResponse> getRestaurantsByCuisine(String cuisineType, Pageable pageable) {
        return restaurantRepository.findByCuisineTypeAndIsActiveTrue(cuisineType, pageable)
                .map(RestaurantMapper::toRestaurantResponse);
    }

    /**
     * Get vegetarian-only restaurants
     */
    public Page<RestaurantResponse> getVegetarianRestaurants(Pageable pageable) {
        return restaurantRepository.findByIsVegetarianOnlyTrueAndIsActiveTrue(pageable)
                .map(RestaurantMapper::toRestaurantResponse);
    }

    /**
     * Filter restaurants by minimum rating
     */
    public Page<RestaurantResponse> getRestaurantsByRating(Double minRating, Pageable pageable) {
        return restaurantRepository.findByRatingGreaterThanEqualAndIsActiveTrue(minRating, pageable)
                .map(RestaurantMapper::toRestaurantResponse);
    }

    /**
     * Filter restaurants by price range
     */
    public Page<RestaurantResponse> getRestaurantsByPriceRange(String priceRange, Pageable pageable) {
        Restaurant.PriceRange range;
        try {
            range = Restaurant.PriceRange.valueOf(priceRange.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid price range. Must be: LOW, MEDIUM, or HIGH");
        }

        return restaurantRepository.findByPriceRangeAndIsActiveTrue(range, pageable)
                .map(RestaurantMapper::toRestaurantResponse);
    }

    /**
     * Get nearby restaurants
     */
    public List<RestaurantResponse> getNearbyRestaurants(Double latitude, Double longitude, Double distance) {
        List<Restaurant> restaurants = restaurantRepository.findNearbyRestaurants(latitude, longitude, distance);

        return restaurants.stream()
                .map(restaurant -> {
                    Double dist = calculateDistance(latitude, longitude, restaurant.getLatitude(),
                            restaurant.getLongitude());
                    return RestaurantMapper.toRestaurantResponseWithDistance(restaurant, dist);
                })
                .collect(Collectors.toList());
    }

    /**
     * Get currently open restaurants
     */
    public Page<RestaurantResponse> getOpenRestaurants(Pageable pageable) {
        return restaurantRepository.findOpenRestaurants(pageable)
                .map(RestaurantMapper::toRestaurantResponse);
    }

    /**
     * Create new restaurant (Admin or Restaurant Owner)
     */
    @Transactional
    public RestaurantResponse createRestaurant(CreateRestaurantRequest request) {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Validate price range
        Restaurant.PriceRange priceRange;
        try {
            priceRange = Restaurant.PriceRange.valueOf(request.getPriceRange().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid price range. Must be: LOW, MEDIUM, or HIGH");
        }

        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setDescription(request.getDescription());
        restaurant.setOwnerId(user.getId());
        restaurant.setAddress(request.getAddress());
        restaurant.setLatitude(request.getLatitude());
        restaurant.setLongitude(request.getLongitude());
        restaurant.setCuisineType(request.getCuisineType());
        restaurant.setAverageDeliveryTime(request.getAverageDeliveryTime());
        restaurant.setPriceRange(priceRange);
        restaurant.setIsVegetarianOnly(request.getIsVegetarianOnly());
        restaurant.setOpeningTime(request.getOpeningTime());
        restaurant.setClosingTime(request.getClosingTime());
        restaurant.setIsActive(true);

        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return RestaurantMapper.toRestaurantResponse(savedRestaurant);
    }

    /**
     * Update restaurant
     */
    @Transactional
    public RestaurantResponse updateRestaurant(Long id, UpdateRestaurantRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));

        // Check ownership (only owner or admin can update)
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!restaurant.getOwnerId().equals(user.getId()) && user.getRole() != User.Role.ADMIN) {
            throw new BadRequestException("You don't have permission to update this restaurant");
        }

        // Validate price range
        Restaurant.PriceRange priceRange;
        try {
            priceRange = Restaurant.PriceRange.valueOf(request.getPriceRange().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid price range. Must be: LOW, MEDIUM, or HIGH");
        }

        restaurant.setName(request.getName());
        restaurant.setDescription(request.getDescription());
        restaurant.setAddress(request.getAddress());
        restaurant.setCuisineType(request.getCuisineType());
        restaurant.setAverageDeliveryTime(request.getAverageDeliveryTime());
        restaurant.setPriceRange(priceRange);
        restaurant.setIsVegetarianOnly(request.getIsVegetarianOnly());
        restaurant.setIsOpen(request.getIsOpen());
        restaurant.setOpeningTime(request.getOpeningTime());
        restaurant.setClosingTime(request.getClosingTime());

        Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
        return RestaurantMapper.toRestaurantResponse(updatedRestaurant);
    }

    /**
     * Upload restaurant logo
     */
    @Transactional
    public RestaurantResponse uploadLogo(Long id, MultipartFile file) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));

        // Check ownership
        checkOwnership(restaurant);

        // Delete old logo if exists
        if (restaurant.getLogoUrl() != null) {
            fileUploadService.deleteFile(restaurant.getLogoUrl());
        }

        // Upload new logo
        String filePath = fileUploadService.uploadFile(file, "restaurants/logos");
        restaurant.setLogoUrl(filePath);

        Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
        return RestaurantMapper.toRestaurantResponse(updatedRestaurant);
    }

    /**
     * Delete restaurant (Admin only) - Soft delete
     */
    @Transactional
    public void deleteRestaurant(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));

        restaurant.setIsActive(false);
        restaurantRepository.save(restaurant);
    }

    /**
     * Get restaurants by owner
     */
    public List<RestaurantResponse> getMyRestaurants() {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Restaurant> restaurants = restaurantRepository.findByOwnerId(user.getId());
        return restaurants.stream()
                .map(RestaurantMapper::toRestaurantResponse)
                .collect(Collectors.toList());
    }

    /**
     * Calculate distance between two points using Haversine formula
     */
    private Double calculateDistance(Double lat1, Double lon1, Double lat2, Double lon2) {
        final int R = 6371; // Radius of the earth in km

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in km
    }

    /**
     * Check if current user owns the restaurant
     */
    private void checkOwnership(Restaurant restaurant) {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!restaurant.getOwnerId().equals(user.getId()) && user.getRole() != User.Role.ADMIN) {
            throw new BadRequestException("You don't have permission to modify this restaurant");
        }
    }

    /**
     * Get current authenticated user's email
     */
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
