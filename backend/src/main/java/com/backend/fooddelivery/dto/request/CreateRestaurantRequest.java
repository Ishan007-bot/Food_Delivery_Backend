package com.backend.fooddelivery.dto.request;

import com.backend.fooddelivery.model.Restaurant;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

/**
 * Create Restaurant Request DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRestaurantRequest {

    @NotBlank(message = "Restaurant name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotBlank(message = "Address is required")
    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;

    @NotBlank(message = "Cuisine type is required")
    @Size(max = 50, message = "Cuisine type must not exceed 50 characters")
    private String cuisineType;

    @Min(value = 0, message = "Average delivery time must be positive")
    private Integer averageDeliveryTime = 30;

    @NotNull(message = "Price range is required")
    private String priceRange; // LOW, MEDIUM, HIGH

    private Boolean isVegetarianOnly = false;

    private LocalTime openingTime;

    private LocalTime closingTime;
}
