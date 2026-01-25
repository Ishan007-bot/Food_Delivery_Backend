package com.backend.fooddelivery.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * MenuItem Entity - Represents food items in restaurant menus
 */
@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long restaurantId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DietaryTag dietaryTag;

    @Column(nullable = false)
    private Boolean isAvailable = true;

    @Column(length = 255)
    private String imageUrl;

    @Column(nullable = false)
    private Integer orderCount = 0; // Track popularity

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Food Category Enum
     */
    public enum Category {
        APPETIZER,
        MAIN_COURSE,
        DESSERT,
        BEVERAGE,
        SNACK,
        SALAD,
        SOUP
    }

    /**
     * Dietary Tag Enum
     */
    public enum DietaryTag {
        VEG, // Vegetarian
        NON_VEG, // Non-Vegetarian
        VEGAN, // Vegan
        GLUTEN_FREE, // Gluten-Free
        DAIRY_FREE, // Dairy-Free
        KETO, // Keto-friendly
        HALAL // Halal
    }

    /**
     * Increment order count (for popularity tracking)
     */
    public void incrementOrderCount() {
        this.orderCount++;
    }
}
