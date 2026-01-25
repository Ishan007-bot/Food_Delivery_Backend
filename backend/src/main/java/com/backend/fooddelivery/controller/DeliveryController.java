package com.backend.fooddelivery.controller;

import com.backend.fooddelivery.model.Delivery;
import com.backend.fooddelivery.service.DeliveryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Delivery Controller - Handles delivery operations
 */
@RestController
@RequestMapping("/api/deliveries")
@Tag(name = "Delivery", description = "Delivery management APIs")
@SecurityRequirement(name = "bearerAuth")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    /**
     * Assign delivery partner to order
     */
    @PostMapping("/assign")
    @PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
    @Operation(summary = "Assign delivery partner to order")
    public ResponseEntity<Delivery> assignDelivery(
            @RequestParam Long orderId,
            @RequestParam Long deliveryPartnerId) {
        Delivery delivery = deliveryService.assignDelivery(orderId, deliveryPartnerId);
        return ResponseEntity.ok(delivery);
    }

    /**
     * Mark delivery as picked up
     */
    @PutMapping("/{deliveryId}/pickup")
    @PreAuthorize("hasRole('DELIVERY_PARTNER')")
    @Operation(summary = "Mark delivery as picked up")
    public ResponseEntity<Delivery> markPickedUp(@PathVariable Long deliveryId) {
        Delivery delivery = deliveryService.markPickedUp(deliveryId);
        return ResponseEntity.ok(delivery);
    }

    /**
     * Mark delivery as delivered
     */
    @PutMapping("/{deliveryId}/deliver")
    @PreAuthorize("hasRole('DELIVERY_PARTNER')")
    @Operation(summary = "Mark delivery as delivered")
    public ResponseEntity<Delivery> markDelivered(@PathVariable Long deliveryId) {
        Delivery delivery = deliveryService.markDelivered(deliveryId);
        return ResponseEntity.ok(delivery);
    }

    /**
     * Get deliveries for partner
     */
    @GetMapping("/partner/{partnerId}")
    @PreAuthorize("hasAnyRole('DELIVERY_PARTNER', 'ADMIN')")
    @Operation(summary = "Get deliveries for delivery partner")
    public ResponseEntity<List<Delivery>> getPartnerDeliveries(@PathVariable Long partnerId) {
        List<Delivery> deliveries = deliveryService.getPartnerDeliveries(partnerId);
        return ResponseEntity.ok(deliveries);
    }
}
