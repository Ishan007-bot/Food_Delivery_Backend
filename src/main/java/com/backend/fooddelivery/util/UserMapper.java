package com.backend.fooddelivery.util;

import com.backend.fooddelivery.dto.response.UserResponse;
import com.backend.fooddelivery.model.User;

/**
 * Mapper utility for converting entities to DTOs
 */
public class UserMapper {

    /**
     * Convert User entity to UserResponse DTO
     */
    public static UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole().name());
        response.setProfilePicture(user.getProfilePicture());
        response.setIsActive(user.getIsActive());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());

        return response;
    }
}
