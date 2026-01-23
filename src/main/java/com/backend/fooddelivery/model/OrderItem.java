package com.backend.fooddelivery.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * OrderItem Entity - Represents items in an order
 */
@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false)
    private Long menuItemId;

    @Column(nullable = false, length = 100)
    private String itemName; // Snapshot of item name at order time

    @Column(nullable = false)
    private Double itemPrice; // Snapshot of price at order time

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double subtotal; // itemPrice * quantity

    @Column(length = 255)
    private String specialInstructions;

    /**
     * Calculate subtotal
     */
    public void calculateSubtotal() {
        this.subtotal = this.itemPrice * this.quantity;
    }
}
