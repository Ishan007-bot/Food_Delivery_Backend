package com.backend.fooddelivery.util;

import com.backend.fooddelivery.dto.response.MenuItemResponse;
import com.backend.fooddelivery.model.MenuItem;

/**
 * Mapper utility for MenuItem entities
 */
public class MenuItemMapper {

    /**
     * Convert MenuItem entity to MenuItemResponse DTO
     */
    public static MenuItemResponse toMenuItemResponse(MenuItem menuItem) {
        if (menuItem == null) {
            return null;
        }

        MenuItemResponse response = new MenuItemResponse();
        response.setId(menuItem.getId());
        response.setRestaurantId(menuItem.getRestaurantId());
        response.setName(menuItem.getName());
        response.setDescription(menuItem.getDescription());
        response.setPrice(menuItem.getPrice());
        response.setCategory(menuItem.getCategory().name());
        response.setDietaryTag(menuItem.getDietaryTag().name());
        response.setIsAvailable(menuItem.getIsAvailable());
        response.setImageUrl(menuItem.getImageUrl());
        response.setOrderCount(menuItem.getOrderCount());
        response.setIsActive(menuItem.getIsActive());
        response.setCreatedAt(menuItem.getCreatedAt());
        response.setUpdatedAt(menuItem.getUpdatedAt());

        return response;
    }

    /**
     * Convert MenuItem entity to MenuItemResponse with restaurant name
     */
    public static MenuItemResponse toMenuItemResponseWithRestaurant(MenuItem menuItem, String restaurantName) {
        MenuItemResponse response = toMenuItemResponse(menuItem);
        if (response != null) {
            response.setRestaurantName(restaurantName);
        }
        return response;
    }
}
