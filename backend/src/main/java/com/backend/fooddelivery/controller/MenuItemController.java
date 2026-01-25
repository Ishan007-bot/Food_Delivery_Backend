package com.backend.fooddelivery.controller;

import com.backend.fooddelivery.dto.request.CreateMenuItemRequest;
import com.backend.fooddelivery.dto.request.UpdateMenuItemRequest;
import com.backend.fooddelivery.dto.response.MenuItemResponse;
import com.backend.fooddelivery.service.MenuItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * MenuItem Controller - Handles menu item operations
 */
@RestController
@RequestMapping("/api")
@Tag(name = "Menu Management", description = "Menu item CRUD and filtering APIs")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    /**
     * Get restaurant menu (Public)
     */
    @GetMapping("/restaurants/{restaurantId}/menu")
    @Operation(summary = "Get restaurant menu", description = "Get all menu items for a restaurant")
    public ResponseEntity<List<MenuItemResponse>> getRestaurantMenu(@PathVariable Long restaurantId) {
        List<MenuItemResponse> menu = menuItemService.getRestaurantMenu(restaurantId);
        return ResponseEntity.ok(menu);
    }

    /**
     * Get available menu items (Public)
     */
    @GetMapping("/restaurants/{restaurantId}/menu/available")
    @Operation(summary = "Get available menu items", description = "Get only available menu items")
    public ResponseEntity<List<MenuItemResponse>> getAvailableMenuItems(@PathVariable Long restaurantId) {
        List<MenuItemResponse> menu = menuItemService.getAvailableMenuItems(restaurantId);
        return ResponseEntity.ok(menu);
    }

    /**
     * Get menu item by ID (Public)
     */
    @GetMapping("/menu-items/{id}")
    @Operation(summary = "Get menu item by ID", description = "Get menu item details")
    public ResponseEntity<MenuItemResponse> getMenuItemById(@PathVariable Long id) {
        MenuItemResponse menuItem = menuItemService.getMenuItemById(id);
        return ResponseEntity.ok(menuItem);
    }

    /**
     * Filter by category (Public)
     */
    @GetMapping("/restaurants/{restaurantId}/menu/category/{category}")
    @Operation(summary = "Filter by category", description = "Get menu items by category")
    public ResponseEntity<Page<MenuItemResponse>> getMenuItemsByCategory(
            @PathVariable Long restaurantId,
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<MenuItemResponse> items = menuItemService.getMenuItemsByCategory(restaurantId, category, pageable);
        return ResponseEntity.ok(items);
    }

    /**
     * Filter by dietary tag (Public)
     */
    @GetMapping("/restaurants/{restaurantId}/menu/dietary/{dietaryTag}")
    @Operation(summary = "Filter by dietary tag", description = "Get menu items by dietary preference")
    public ResponseEntity<Page<MenuItemResponse>> getMenuItemsByDietaryTag(
            @PathVariable Long restaurantId,
            @PathVariable String dietaryTag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<MenuItemResponse> items = menuItemService.getMenuItemsByDietaryTag(restaurantId, dietaryTag, pageable);
        return ResponseEntity.ok(items);
    }

    /**
     * Filter by price range (Public)
     */
    @GetMapping("/restaurants/{restaurantId}/menu/price")
    @Operation(summary = "Filter by price range", description = "Get menu items within price range")
    public ResponseEntity<Page<MenuItemResponse>> getMenuItemsByPriceRange(
            @PathVariable Long restaurantId,
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("price").ascending());
        Page<MenuItemResponse> items = menuItemService.getMenuItemsByPriceRange(restaurantId, minPrice, maxPrice,
                pageable);
        return ResponseEntity.ok(items);
    }

    /**
     * Search menu items (Public)
     */
    @GetMapping("/restaurants/{restaurantId}/menu/search")
    @Operation(summary = "Search menu items", description = "Search menu items by name")
    public ResponseEntity<Page<MenuItemResponse>> searchMenuItems(
            @PathVariable Long restaurantId,
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<MenuItemResponse> items = menuItemService.searchMenuItems(restaurantId, name, pageable);
        return ResponseEntity.ok(items);
    }

    /**
     * Get popular menu items (Public)
     */
    @GetMapping("/restaurants/{restaurantId}/menu/popular")
    @Operation(summary = "Get popular items", description = "Get most ordered menu items")
    public ResponseEntity<List<MenuItemResponse>> getPopularMenuItems(
            @PathVariable Long restaurantId,
            @RequestParam(defaultValue = "10") int limit) {

        List<MenuItemResponse> items = menuItemService.getPopularMenuItems(restaurantId, limit);
        return ResponseEntity.ok(items);
    }

    /**
     * Search across all restaurants (Public)
     */
    @GetMapping("/menu-items/search")
    @Operation(summary = "Search all menu items", description = "Search menu items across all restaurants")
    public ResponseEntity<Page<MenuItemResponse>> searchAllMenuItems(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<MenuItemResponse> items = menuItemService.searchAllMenuItems(name, pageable);
        return ResponseEntity.ok(items);
    }

    /**
     * Create menu item (Restaurant Owner)
     */
    @PostMapping("/restaurants/{restaurantId}/menu")
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create menu item", description = "Add new item to restaurant menu")
    public ResponseEntity<MenuItemResponse> createMenuItem(
            @PathVariable Long restaurantId,
            @Valid @RequestBody CreateMenuItemRequest request) {
        MenuItemResponse menuItem = menuItemService.createMenuItem(restaurantId, request);
        return new ResponseEntity<>(menuItem, HttpStatus.CREATED);
    }

    /**
     * Update menu item (Restaurant Owner)
     */
    @PutMapping("/menu-items/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update menu item", description = "Update menu item details")
    public ResponseEntity<MenuItemResponse> updateMenuItem(
            @PathVariable Long id,
            @Valid @RequestBody UpdateMenuItemRequest request) {
        MenuItemResponse menuItem = menuItemService.updateMenuItem(id, request);
        return ResponseEntity.ok(menuItem);
    }

    /**
     * Upload menu item image (Restaurant Owner)
     */
    @PostMapping("/menu-items/{id}/image")
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Upload menu item image", description = "Upload image for menu item")
    public ResponseEntity<MenuItemResponse> uploadMenuItemImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        MenuItemResponse menuItem = menuItemService.uploadMenuItemImage(id, file);
        return ResponseEntity.ok(menuItem);
    }

    /**
     * Toggle availability (Restaurant Owner)
     */
    @PatchMapping("/menu-items/{id}/availability")
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Toggle availability", description = "Toggle menu item availability")
    public ResponseEntity<MenuItemResponse> toggleAvailability(@PathVariable Long id) {
        MenuItemResponse menuItem = menuItemService.toggleAvailability(id);
        return ResponseEntity.ok(menuItem);
    }

    /**
     * Delete menu item (Restaurant Owner)
     */
    @DeleteMapping("/menu-items/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Delete menu item", description = "Soft delete menu item")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }
}
