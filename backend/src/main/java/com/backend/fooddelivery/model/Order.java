package com.backend.fooddelivery.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Order Entity - Represents customer orders
 */
@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long customerId;

    @Column(nullable = false)
    private Long restaurantId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private OrderStatus status = OrderStatus.PLACED;

    @Column(nullable = false)
    private Double subtotal;

    @Column(nullable = false)
    private Double deliveryFee;

    @Column(nullable = false)
    private Double tax;

    @Column(nullable = false)
    private Double discount = 0.0;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false, length = 255)
    private String deliveryAddress;

    @Column(length = 500)
    private String specialInstructions;

    @Column
    private Long deliveryPartnerId; // Assigned delivery partner

    @Column
    private LocalDateTime estimatedDeliveryTime;

    @Column
    private LocalDateTime actualDeliveryTime;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime orderedAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Order Status Enum
     */
    public enum OrderStatus {
        PLACED, // Order placed by customer
        CONFIRMED, // Restaurant confirmed
        PREPARING, // Food being prepared
        READY_FOR_PICKUP, // Ready for delivery partner
        OUT_FOR_DELIVERY, // Delivery partner picked up
        DELIVERED, // Successfully delivered
        CANCELLED // Order cancelled
    }

    /**
     * Add order item
     */
    public void addOrderItem(OrderItem item) {
        orderItems.add(item);
        item.setOrder(this);
    }

    /**
     * Remove order item
     */
    public void removeOrderItem(OrderItem item) {
        orderItems.remove(item);
        item.setOrder(null);
    }

    /**
     * Calculate total amount
     */
    public void calculateTotalAmount() {
        this.totalAmount = this.subtotal + this.deliveryFee + this.tax - this.discount;
    }

    /**
     * Check if order can be cancelled
     */
    public boolean canBeCancelled() {
        return this.status == OrderStatus.PLACED || this.status == OrderStatus.CONFIRMED;
    }

    /**
     * Check if order is in final state
     */
    public boolean isFinalState() {
        return this.status == OrderStatus.DELIVERED || this.status == OrderStatus.CANCELLED;
    }
}
