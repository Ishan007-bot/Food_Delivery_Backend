package com.backend.fooddelivery.repository;

import com.backend.fooddelivery.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Order Repository with custom queries
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Find orders by customer ID
     */
    Page<Order> findByCustomerIdOrderByOrderedAtDesc(Long customerId, Pageable pageable);

    /**
     * Find orders by restaurant ID
     */
    Page<Order> findByRestaurantIdOrderByOrderedAtDesc(Long restaurantId, Pageable pageable);

    /**
     * Find orders by delivery partner ID
     */
    Page<Order> findByDeliveryPartnerIdOrderByOrderedAtDesc(Long deliveryPartnerId, Pageable pageable);

    /**
     * Find orders by status
     */
    Page<Order> findByStatusOrderByOrderedAtDesc(Order.OrderStatus status, Pageable pageable);

    /**
     * Find orders by customer and status
     */
    Page<Order> findByCustomerIdAndStatusOrderByOrderedAtDesc(Long customerId, Order.OrderStatus status,
            Pageable pageable);

    /**
     * Find orders by restaurant and status
     */
    Page<Order> findByRestaurantIdAndStatusOrderByOrderedAtDesc(Long restaurantId, Order.OrderStatus status,
            Pageable pageable);

    /**
     * Find orders by date range
     */
    @Query("SELECT o FROM Order o WHERE o.customerId = :customerId AND o.orderedAt BETWEEN :startDate AND :endDate ORDER BY o.orderedAt DESC")
    List<Order> findByCustomerIdAndDateRange(
            @Param("customerId") Long customerId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);

    /**
     * Find pending orders for restaurant (not delivered or cancelled)
     */
    @Query("SELECT o FROM Order o WHERE o.restaurantId = :restaurantId AND o.status NOT IN ('DELIVERED', 'CANCELLED') ORDER BY o.orderedAt DESC")
    List<Order> findPendingOrdersByRestaurant(@Param("restaurantId") Long restaurantId);

    /**
     * Find orders ready for pickup (for delivery partners)
     */
    List<Order> findByStatusOrderByOrderedAtAsc(Order.OrderStatus status);

    /**
     * Calculate total revenue for restaurant
     */
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.restaurantId = :restaurantId AND o.status = 'DELIVERED'")
    Double calculateRestaurantRevenue(@Param("restaurantId") Long restaurantId);

    /**
     * Count orders by status for restaurant
     */
    @Query("SELECT COUNT(o) FROM Order o WHERE o.restaurantId = :restaurantId AND o.status = :status")
    Long countByRestaurantIdAndStatus(@Param("restaurantId") Long restaurantId,
            @Param("status") Order.OrderStatus status);
}
