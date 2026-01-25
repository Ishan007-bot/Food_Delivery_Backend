package com.backend.fooddelivery.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Order Response DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private Long id;
    private Long customerId;
    private String customerName;
    private Long restaurantId;
    private String restaurantName;
    private String status;
    private Double subtotal;
    private Double deliveryFee;
    private Double tax;
    private Double discount;
    private Double totalAmount;
    private String deliveryAddress;
    private String specialInstructions;
    private Long deliveryPartnerId;
    private String deliveryPartnerName;
    private LocalDateTime estimatedDeliveryTime;
    private LocalDateTime actualDeliveryTime;
    private List<OrderItemResponse> orderItems;
    private LocalDateTime orderedAt;
    private LocalDateTime updatedAt;

    /**
     * Order Item Response
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemResponse {
        private Long id;
        private Long menuItemId;
        private String itemName;
        private Double itemPrice;
        private Integer quantity;
        private Double subtotal;
        private String specialInstructions;
    }
}
