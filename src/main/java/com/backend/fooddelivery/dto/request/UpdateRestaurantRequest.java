package com.backend.fooddelivery.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

/**
 * Update Restaurant Request DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRestaurantRequest {

    @NotBlank(message = "Restaurant name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotBlank(message = "Address is required")
    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    @NotBlank(message = "Cuisine type is required")
    @Size(max = 50, message = "Cuisine type must not exceed 50 characters")
    private String cuisineType;

    @Min(value = 0, message = "Average delivery time must be positive")
    private Integer averageDeliveryTime;

    @NotNull(message = "Price range is required")
    private String priceRange; // LOW, MEDIUM, HIGH

    private Boolean isVegetarianOnly;

    private Boolean isOpen;

    private LocalTime openingTime;

    private LocalTime closingTime;
}
