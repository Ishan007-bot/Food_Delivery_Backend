package com.backend.fooddelivery.util;

import com.backend.fooddelivery.dto.response.OrderResponse;
import com.backend.fooddelivery.model.Order;
import com.backend.fooddelivery.model.OrderItem;

import java.util.stream.Collectors;

/**
 * Mapper utility for Order entities
 */
public class OrderMapper {

    /**
     * Convert Order entity to OrderResponse DTO
     */
    public static OrderResponse toOrderResponse(Order order) {
        if (order == null) {
            return null;
        }

        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setCustomerId(order.getCustomerId());
        response.setRestaurantId(order.getRestaurantId());
        response.setStatus(order.getStatus().name());
        response.setSubtotal(order.getSubtotal());
        response.setDeliveryFee(order.getDeliveryFee());
        response.setTax(order.getTax());
        response.setDiscount(order.getDiscount());
        response.setTotalAmount(order.getTotalAmount());
        response.setDeliveryAddress(order.getDeliveryAddress());
        response.setSpecialInstructions(order.getSpecialInstructions());
        response.setDeliveryPartnerId(order.getDeliveryPartnerId());
        response.setEstimatedDeliveryTime(order.getEstimatedDeliveryTime());
        response.setActualDeliveryTime(order.getActualDeliveryTime());
        response.setOrderedAt(order.getOrderedAt());
        response.setUpdatedAt(order.getUpdatedAt());

        // Map order items
        if (order.getOrderItems() != null) {
            response.setOrderItems(
                    order.getOrderItems().stream()
                            .map(OrderMapper::toOrderItemResponse)
                            .collect(Collectors.toList()));
        }

        return response;
    }

    /**
     * Convert OrderItem entity to OrderItemResponse DTO
     */
    private static OrderResponse.OrderItemResponse toOrderItemResponse(OrderItem orderItem) {
        if (orderItem == null) {
            return null;
        }

        OrderResponse.OrderItemResponse response = new OrderResponse.OrderItemResponse();
        response.setId(orderItem.getId());
        response.setMenuItemId(orderItem.getMenuItemId());
        response.setItemName(orderItem.getItemName());
        response.setItemPrice(orderItem.getItemPrice());
        response.setQuantity(orderItem.getQuantity());
        response.setSubtotal(orderItem.getSubtotal());
        response.setSpecialInstructions(orderItem.getSpecialInstructions());

        return response;
    }
}
