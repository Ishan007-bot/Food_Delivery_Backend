package com.backend.fooddelivery.service;

import com.backend.fooddelivery.dto.request.PlaceOrderRequest;
import com.backend.fooddelivery.dto.response.OrderResponse;
import com.backend.fooddelivery.exception.BadRequestException;
import com.backend.fooddelivery.exception.ResourceNotFoundException;
import com.backend.fooddelivery.model.*;
import com.backend.fooddelivery.repository.*;
import com.backend.fooddelivery.util.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Order Service - Handles order operations
 */
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Double DELIVERY_FEE = 50.0;
    private static final Double TAX_RATE = 0.05; // 5%

    /**
     * Place new order
     */
    @Transactional
    public OrderResponse placeOrder(PlaceOrderRequest request) {
        String email = getCurrentUserEmail();
        User customer = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Restaurant restaurant = restaurantRepository.findByIdAndIsActiveTrue(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        // Create order
        Order order = new Order();
        order.setCustomerId(customer.getId());
        order.setRestaurantId(restaurant.getId());
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setSpecialInstructions(request.getSpecialInstructions());
        order.setStatus(Order.OrderStatus.PLACED);
        order.setDeliveryFee(DELIVERY_FEE);

        // Add order items and calculate subtotal
        double subtotal = 0.0;
        for (PlaceOrderRequest.OrderItemRequest itemReq : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findByIdAndIsActiveTrue(itemReq.getMenuItemId())
                    .orElseThrow(
                            () -> new ResourceNotFoundException("Menu item not found: " + itemReq.getMenuItemId()));

            if (!menuItem.getIsAvailable()) {
                throw new BadRequestException("Menu item not available: " + menuItem.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItemId(menuItem.getId());
            orderItem.setItemName(menuItem.getName());
            orderItem.setItemPrice(menuItem.getPrice());
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setSpecialInstructions(itemReq.getSpecialInstructions());
            orderItem.calculateSubtotal();

            order.addOrderItem(orderItem);
            subtotal += orderItem.getSubtotal();

            // Increment menu item order count
            menuItem.incrementOrderCount();
            menuItemRepository.save(menuItem);
        }

        order.setSubtotal(subtotal);
        order.setTax(subtotal * TAX_RATE);
        order.calculateTotalAmount();
        order.setEstimatedDeliveryTime(LocalDateTime.now().plusMinutes(restaurant.getAverageDeliveryTime()));

        Order savedOrder = orderRepository.save(order);
        return OrderMapper.toOrderResponse(savedOrder);
    }

    /**
     * Get order by ID
     */
    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        // Check access
        checkOrderAccess(order);

        return OrderMapper.toOrderResponse(order);
    }

    /**
     * Get customer orders
     */
    public Page<OrderResponse> getMyOrders(Pageable pageable) {
        String email = getCurrentUserEmail();
        User customer = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return orderRepository.findByCustomerIdOrderByOrderedAtDesc(customer.getId(), pageable)
                .map(OrderMapper::toOrderResponse);
    }

    /**
     * Get restaurant orders
     */
    public Page<OrderResponse> getRestaurantOrders(Long restaurantId, Pageable pageable) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        checkRestaurantOwnership(restaurant);

        return orderRepository.findByRestaurantIdOrderByOrderedAtDesc(restaurantId, pageable)
                .map(OrderMapper::toOrderResponse);
    }

    /**
     * Update order status
     */
    @Transactional
    public OrderResponse updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        Order.OrderStatus newStatus;
        try {
            newStatus = Order.OrderStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid order status");
        }

        // Validate status transition
        if (order.isFinalState()) {
            throw new BadRequestException("Cannot update order in final state");
        }

        order.setStatus(newStatus);

        if (newStatus == Order.OrderStatus.DELIVERED) {
            order.setActualDeliveryTime(LocalDateTime.now());
        }

        Order updatedOrder = orderRepository.save(order);
        return OrderMapper.toOrderResponse(updatedOrder);
    }

    /**
     * Cancel order
     */
    @Transactional
    public OrderResponse cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        checkOrderAccess(order);

        if (!order.canBeCancelled()) {
            throw new BadRequestException("Order cannot be cancelled at this stage");
        }

        order.setStatus(Order.OrderStatus.CANCELLED);
        Order updatedOrder = orderRepository.save(order);
        return OrderMapper.toOrderResponse(updatedOrder);
    }

    /**
     * Check if current user has access to order
     */
    private void checkOrderAccess(Order order) {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() == User.Role.ADMIN) {
            return; // Admin has access to all orders
        }

        if (!order.getCustomerId().equals(user.getId())) {
            throw new BadRequestException("You don't have access to this order");
        }
    }

    /**
     * Check restaurant ownership
     */
    private void checkRestaurantOwnership(Restaurant restaurant) {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != User.Role.ADMIN && !restaurant.getOwnerId().equals(user.getId())) {
            throw new BadRequestException("You don't have permission to access this restaurant's orders");
        }
    }

    /**
     * Get current user email
     */
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
