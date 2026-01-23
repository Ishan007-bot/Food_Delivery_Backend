package com.backend.fooddelivery.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * MenuItem Response DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItemResponse {

    private Long id;
    private Long restaurantId;
    private String restaurantName; // Optional - for search results
    private String name;
    private String description;
    private Double price;
    private String category;
    private String dietaryTag;
    private Boolean isAvailable;
    private String imageUrl;
    private Integer orderCount;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
