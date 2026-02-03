package com.backend.fooddelivery.service;

import com.backend.fooddelivery.dto.request.CreateMenuItemRequest;
import com.backend.fooddelivery.dto.request.UpdateMenuItemRequest;
import com.backend.fooddelivery.dto.response.MenuItemResponse;
import com.backend.fooddelivery.exception.BadRequestException;
import com.backend.fooddelivery.exception.ResourceNotFoundException;
import com.backend.fooddelivery.model.MenuItem;
import com.backend.fooddelivery.model.Restaurant;
import com.backend.fooddelivery.model.User;
import com.backend.fooddelivery.repository.MenuItemRepository;
import com.backend.fooddelivery.repository.RestaurantRepository;
import com.backend.fooddelivery.repository.UserRepository;
import com.backend.fooddelivery.util.MenuItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

/**
 * MenuItem Service - Handles menu item operations
 */
@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileUploadService fileUploadService;

    /**
     * Get restaurant menu (all items)
     */
    @Cacheable(value = "menuItems", key = "'restaurant:' + #restaurantId")
    public List<MenuItemResponse> getRestaurantMenu(Long restaurantId) {
        return menuItemRepository.findByRestaurantIdAndIsActiveTrue(restaurantId).stream()
                .map(MenuItemMapper::toMenuItemResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get available menu items
     */
    public List<MenuItemResponse> getAvailableMenuItems(Long restaurantId) {
        return menuItemRepository.findByRestaurantIdAndIsActiveTrueAndIsAvailableTrue(restaurantId).stream()
                .map(MenuItemMapper::toMenuItemResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get menu item by ID
     */
    @Cacheable(value = "menuItems", key = "#id")
    public MenuItemResponse getMenuItemById(Long id) {
        MenuItem menuItem = menuItemRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
        return MenuItemMapper.toMenuItemResponse(menuItem);
    }

    /**
     * Filter by category
     */
    public Page<MenuItemResponse> getMenuItemsByCategory(Long restaurantId, String category, Pageable pageable) {
        MenuItem.Category cat = parseCategory(category);
        return menuItemRepository.findByRestaurantIdAndCategoryAndIsActiveTrue(restaurantId, cat, pageable)
                .map(MenuItemMapper::toMenuItemResponse);
    }

    /**
     * Filter by dietary tag
     */
    public Page<MenuItemResponse> getMenuItemsByDietaryTag(Long restaurantId, String dietaryTag, Pageable pageable) {
        MenuItem.DietaryTag tag = parseDietaryTag(dietaryTag);
        return menuItemRepository.findByRestaurantIdAndDietaryTagAndIsActiveTrue(restaurantId, tag, pageable)
                .map(MenuItemMapper::toMenuItemResponse);
    }

    /**
     * Filter by price range
     */
    public Page<MenuItemResponse> getMenuItemsByPriceRange(Long restaurantId, Double minPrice, Double maxPrice,
            Pageable pageable) {
        return menuItemRepository
                .findByRestaurantIdAndPriceBetweenAndIsActiveTrue(restaurantId, minPrice, maxPrice, pageable)
                .map(MenuItemMapper::toMenuItemResponse);
    }

    /**
     * Search menu items
     */
    public Page<MenuItemResponse> searchMenuItems(Long restaurantId, String name, Pageable pageable) {
        return menuItemRepository
                .findByRestaurantIdAndNameContainingIgnoreCaseAndIsActiveTrue(restaurantId, name, pageable)
                .map(MenuItemMapper::toMenuItemResponse);
    }

    /**
     * Get popular menu items
     */
    public List<MenuItemResponse> getPopularMenuItems(Long restaurantId, int limit) {
        List<MenuItem> items = menuItemRepository.findPopularMenuItems(restaurantId, Pageable.ofSize(limit));
        return items.stream()
                .map(MenuItemMapper::toMenuItemResponse)
                .collect(Collectors.toList());
    }

    /**
     * Search across all restaurants
     */
    public Page<MenuItemResponse> searchAllMenuItems(String name, Pageable pageable) {
        return menuItemRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(name, pageable)
                .map(MenuItemMapper::toMenuItemResponse);
    }

    /**
     * Create menu item (Restaurant Owner)
     */
    @Transactional
    @CacheEvict(value = "menuItems", key = "'restaurant:' + #restaurantId")
    public MenuItemResponse createMenuItem(Long restaurantId, CreateMenuItemRequest request) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + restaurantId));

        // Check ownership
        checkRestaurantOwnership(restaurant);

        MenuItem menuItem = new MenuItem();
        menuItem.setRestaurantId(restaurantId);
        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setCategory(parseCategory(request.getCategory()));
        menuItem.setDietaryTag(parseDietaryTag(request.getDietaryTag()));
        menuItem.setIsAvailable(request.getIsAvailable());
        menuItem.setIsActive(true);

        MenuItem savedItem = menuItemRepository.save(menuItem);
        return MenuItemMapper.toMenuItemResponse(savedItem);
    }

    /**
     * Update menu item
     */
    @Transactional
    @CacheEvict(value = "menuItems", allEntries = true)
    public MenuItemResponse updateMenuItem(Long id, UpdateMenuItemRequest request) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        Restaurant restaurant = restaurantRepository.findById(menuItem.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        // Check ownership
        checkRestaurantOwnership(restaurant);

        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setCategory(parseCategory(request.getCategory()));
        menuItem.setDietaryTag(parseDietaryTag(request.getDietaryTag()));
        menuItem.setIsAvailable(request.getIsAvailable());

        MenuItem updatedItem = menuItemRepository.save(menuItem);
        return MenuItemMapper.toMenuItemResponse(updatedItem);
    }

    /**
     * Upload menu item image
     */
    @Transactional
    @CacheEvict(value = "menuItems", key = "#id")
    public MenuItemResponse uploadMenuItemImage(Long id, MultipartFile file) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        Restaurant restaurant = restaurantRepository.findById(menuItem.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        // Check ownership
        checkRestaurantOwnership(restaurant);

        // Delete old image if exists
        if (menuItem.getImageUrl() != null) {
            fileUploadService.deleteFile(menuItem.getImageUrl());
        }

        // Upload new image
        String filePath = fileUploadService.uploadFile(file, "menu-items");
        menuItem.setImageUrl(filePath);

        MenuItem updatedItem = menuItemRepository.save(menuItem);
        return MenuItemMapper.toMenuItemResponse(updatedItem);
    }

    /**
     * Toggle availability
     */
    @Transactional
    @CacheEvict(value = "menuItems", allEntries = true)
    public MenuItemResponse toggleAvailability(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        Restaurant restaurant = restaurantRepository.findById(menuItem.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        // Check ownership
        checkRestaurantOwnership(restaurant);

        menuItem.setIsAvailable(!menuItem.getIsAvailable());
        MenuItem updatedItem = menuItemRepository.save(menuItem);
        return MenuItemMapper.toMenuItemResponse(updatedItem);
    }

    /**
     * Delete menu item (soft delete)
     */
    @Transactional
    @CacheEvict(value = "menuItems", allEntries = true)
    public void deleteMenuItem(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        Restaurant restaurant = restaurantRepository.findById(menuItem.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        // Check ownership
        checkRestaurantOwnership(restaurant);

        menuItem.setIsActive(false);
        menuItemRepository.save(menuItem);
    }

    /**
     * Parse category string to enum
     */
    private MenuItem.Category parseCategory(String category) {
        try {
            return MenuItem.Category.valueOf(category.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(
                    "Invalid category. Must be: APPETIZER, MAIN_COURSE, DESSERT, BEVERAGE, SNACK, SALAD, SOUP");
        }
    }

    /**
     * Parse dietary tag string to enum
     */
    private MenuItem.DietaryTag parseDietaryTag(String dietaryTag) {
        try {
            return MenuItem.DietaryTag.valueOf(dietaryTag.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(
                    "Invalid dietary tag. Must be: VEG, NON_VEG, VEGAN, GLUTEN_FREE, DAIRY_FREE, KETO, HALAL");
        }
    }

    /**
     * Check if current user owns the restaurant
     */
    private void checkRestaurantOwnership(Restaurant restaurant) {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!restaurant.getOwnerId().equals(user.getId()) && user.getRole() != User.Role.ADMIN) {
            throw new BadRequestException("You don't have permission to modify this menu item");
        }
    }

    /**
     * Get current authenticated user's email
     */
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
