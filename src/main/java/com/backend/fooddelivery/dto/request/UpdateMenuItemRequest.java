package com.backend.fooddelivery.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Update MenuItem Request DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMenuItemRequest {

    @NotBlank(message = "Item name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private Double price;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Dietary tag is required")
    private String dietaryTag;

    @NotNull(message = "Availability is required")
    private Boolean isAvailable;
}
