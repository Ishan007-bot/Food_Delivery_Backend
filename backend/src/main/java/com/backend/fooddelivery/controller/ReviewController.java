package com.backend.fooddelivery.controller;

import com.backend.fooddelivery.dto.request.ReviewRequest;
import com.backend.fooddelivery.model.Review;
import com.backend.fooddelivery.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Review Controller - Handles review operations
 */
@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Review Management", description = "Customer review and rating APIs")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    /**
     * Submit review (Customer)
     */
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Submit review", description = "Submit review for delivered order")
    public ResponseEntity<Review> submitReview(@Valid @RequestBody ReviewRequest request) {
        Review review = reviewService.submitReview(request);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    /**
     * Get restaurant reviews (Public)
     */
    @GetMapping("/restaurant/{restaurantId}")
    @Operation(summary = "Get restaurant reviews", description = "Get all reviews for a restaurant")
    public ResponseEntity<Page<Review>> getRestaurantReviews(
            @PathVariable Long restaurantId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Review> reviews = reviewService.getRestaurantReviews(restaurantId, pageable);
        return ResponseEntity.ok(reviews);
    }
}
