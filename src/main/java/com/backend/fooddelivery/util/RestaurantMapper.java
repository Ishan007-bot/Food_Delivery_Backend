package com.backend.fooddelivery.util;

import com.backend.fooddelivery.dto.response.RestaurantResponse;
import com.backend.fooddelivery.model.Restaurant;

/**
 * Mapper utility for Restaurant entities
 */
public class RestaurantMapper {

    /**
     * Convert Restaurant entity to RestaurantResponse DTO
     */
    public static RestaurantResponse toRestaurantResponse(Restaurant restaurant) {
        if (restaurant == null) {
            return null;
        }

        RestaurantResponse response = new RestaurantResponse();
        response.setId(restaurant.getId());
        response.setName(restaurant.getName());
        response.setDescription(restaurant.getDescription());
        response.setOwnerId(restaurant.getOwnerId());
        response.setAddress(restaurant.getAddress());
        response.setLatitude(restaurant.getLatitude());
        response.setLongitude(restaurant.getLongitude());
        response.setCuisineType(restaurant.getCuisineType());
        response.setRating(restaurant.getRating());
        response.setTotalReviews(restaurant.getTotalReviews());
        response.setAverageDeliveryTime(restaurant.getAverageDeliveryTime());
        response.setPriceRange(restaurant.getPriceRange().name());
        response.setIsOpen(restaurant.getIsOpen());
        response.setIsVegetarianOnly(restaurant.getIsVegetarianOnly());
        response.setOpeningTime(restaurant.getOpeningTime());
        response.setClosingTime(restaurant.getClosingTime());
        response.setLogoUrl(restaurant.getLogoUrl());
        response.setImageUrls(restaurant.getImageUrls());
        response.setIsActive(restaurant.getIsActive());
        response.setIsCurrentlyOpen(restaurant.isCurrentlyOpen());
        response.setCreatedAt(restaurant.getCreatedAt());
        response.setUpdatedAt(restaurant.getUpdatedAt());

        return response;
    }

    /**
     * Convert Restaurant entity to RestaurantResponse with distance
     */
    public static RestaurantResponse toRestaurantResponseWithDistance(Restaurant restaurant, Double distance) {
        RestaurantResponse response = toRestaurantResponse(restaurant);
        if (response != null) {
            response.setDistance(distance);
        }
        return response;
    }
}
