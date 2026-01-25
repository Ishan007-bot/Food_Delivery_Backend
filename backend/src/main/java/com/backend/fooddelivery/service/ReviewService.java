package com.backend.fooddelivery.service;

import com.backend.fooddelivery.dto.request.ReviewRequest;
import com.backend.fooddelivery.exception.BadRequestException;
import com.backend.fooddelivery.exception.ResourceNotFoundException;
import com.backend.fooddelivery.model.Order;
import com.backend.fooddelivery.model.Restaurant;
import com.backend.fooddelivery.model.Review;
import com.backend.fooddelivery.model.User;
import com.backend.fooddelivery.repository.OrderRepository;
import com.backend.fooddelivery.repository.RestaurantRepository;
import com.backend.fooddelivery.repository.ReviewRepository;
import com.backend.fooddelivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Review Service - Handles review operations
 */
@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Submit review for order
     */
    @Transactional
    public Review submitReview(ReviewRequest request) {
        String email = getCurrentUserEmail();
        User customer = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        // Validate order belongs to customer
        if (!order.getCustomerId().equals(customer.getId())) {
            throw new BadRequestException("You can only review your own orders");
        }

        // Check if order is delivered
        if (order.getStatus() != Order.OrderStatus.DELIVERED) {
            throw new BadRequestException("You can only review delivered orders");
        }

        // Check if already reviewed
        if (reviewRepository.existsByOrderId(order.getId())) {
            throw new BadRequestException("You have already reviewed this order");
        }

        Review review = new Review();
        review.setRestaurantId(order.getRestaurantId());
        review.setCustomerId(customer.getId());
        review.setOrderId(order.getId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        // Update restaurant rating
        updateRestaurantRating(order.getRestaurantId());

        return savedReview;
    }

    /**
     * Get reviews for restaurant
     */
    public Page<Review> getRestaurantReviews(Long restaurantId, Pageable pageable) {
        return reviewRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId, pageable);
    }

    /**
     * Update restaurant rating based on reviews
     */
    @Transactional
    public void updateRestaurantRating(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        Double avgRating = reviewRepository.calculateAverageRating(restaurantId);
        Long totalReviews = reviewRepository.countByRestaurantId(restaurantId);

        restaurant.setRating(avgRating != null ? avgRating : 0.0);
        restaurant.setTotalReviews(totalReviews.intValue());

        restaurantRepository.save(restaurant);
    }

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
