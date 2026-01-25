package com.backend.fooddelivery.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.backend.fooddelivery.repository.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Analytics Controller - Provides business analytics
 */
@RestController
@RequestMapping("/api/analytics")
@Tag(name = "Analytics", description = "Business analytics and reporting APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class AnalyticsController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Get restaurant analytics (Restaurant Owner)
     */
    @GetMapping("/restaurant/{restaurantId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @Operation(summary = "Get restaurant analytics", description = "Get revenue, orders, and ratings")
    public ResponseEntity<Map<String, Object>> getRestaurantAnalytics(@PathVariable Long restaurantId) {
        Map<String, Object> analytics = new HashMap<>();

        // Revenue
        Double revenue = orderRepository.calculateRestaurantRevenue(restaurantId);
        analytics.put("totalRevenue", revenue != null ? revenue : 0.0);

        // Order counts by status
        analytics.put("placedOrders", orderRepository.countByRestaurantIdAndStatus(restaurantId,
                com.backend.fooddelivery.model.Order.OrderStatus.PLACED));
        analytics.put("deliveredOrders", orderRepository.countByRestaurantIdAndStatus(restaurantId,
                com.backend.fooddelivery.model.Order.OrderStatus.DELIVERED));
        analytics.put("cancelledOrders", orderRepository.countByRestaurantIdAndStatus(restaurantId,
                com.backend.fooddelivery.model.Order.OrderStatus.CANCELLED));

        // Ratings
        Double avgRating = reviewRepository.calculateAverageRating(restaurantId);
        Long totalReviews = reviewRepository.countByRestaurantId(restaurantId);
        analytics.put("averageRating", avgRating != null ? avgRating : 0.0);
        analytics.put("totalReviews", totalReviews);

        return ResponseEntity.ok(analytics);
    }

    /**
     * Get system-wide analytics (Admin only)
     */
    @GetMapping("/system")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get system analytics", description = "Get overall system statistics")
    public ResponseEntity<Map<String, Object>> getSystemAnalytics() {
        Map<String, Object> analytics = new HashMap<>();

        analytics.put("totalRestaurants", restaurantRepository.count());
        analytics.put("totalOrders", orderRepository.count());
        analytics.put("totalReviews", reviewRepository.count());

        return ResponseEntity.ok(analytics);
    }
}
