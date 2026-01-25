package com.backend.fooddelivery.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Restaurant Entity
 */
@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Long ownerId; // Reference to User with RESTAURANT_OWNER role

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(length = 50)
    private String cuisineType; // Italian, Chinese, Indian, Mexican, etc.

    @Column(nullable = false)
    private Double rating = 0.0;

    @Column(nullable = false)
    private Integer totalReviews = 0;

    @Column(nullable = false)
    private Integer averageDeliveryTime = 30; // in minutes

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PriceRange priceRange = PriceRange.MEDIUM;

    @Column(nullable = false)
    private Boolean isOpen = true;

    @Column(nullable = false)
    private Boolean isVegetarianOnly = false;

    @Column
    private LocalTime openingTime;

    @Column
    private LocalTime closingTime;

    @Column(length = 255)
    private String logoUrl;

    @Column(length = 1000)
    private String imageUrls; // Comma-separated image URLs

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Price Range Enum
     */
    public enum PriceRange {
        LOW, // ₹
        MEDIUM, // ₹₹
        HIGH // ₹₹₹
    }

    /**
     * Check if restaurant is currently open
     */
    public boolean isCurrentlyOpen() {
        if (!isOpen || !isActive) {
            return false;
        }

        if (openingTime == null || closingTime == null) {
            return true; // 24/7 if times not set
        }

        LocalTime now = LocalTime.now();

        // Handle overnight hours (e.g., 22:00 - 02:00)
        if (closingTime.isBefore(openingTime)) {
            return now.isAfter(openingTime) || now.isBefore(closingTime);
        }

        return now.isAfter(openingTime) && now.isBefore(closingTime);
    }
}
