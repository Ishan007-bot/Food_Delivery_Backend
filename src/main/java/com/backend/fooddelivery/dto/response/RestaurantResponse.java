package com.backend.fooddelivery.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Restaurant Response DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantResponse {

    private Long id;
    private String name;
    private String description;
    private Long ownerId;
    private String address;
    private Double latitude;
    private Double longitude;
    private String cuisineType;
    private Double rating;
    private Integer totalReviews;
    private Integer averageDeliveryTime;
    private String priceRange;
    private Boolean isOpen;
    private Boolean isVegetarianOnly;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private String logoUrl;
    private String imageUrls;
    private Boolean isActive;
    private Boolean isCurrentlyOpen;
    private Double distance; // Distance from user location (optional)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
