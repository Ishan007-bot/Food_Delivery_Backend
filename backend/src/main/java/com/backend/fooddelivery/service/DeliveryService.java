package com.backend.fooddelivery.service;

import com.backend.fooddelivery.exception.ResourceNotFoundException;
import com.backend.fooddelivery.model.Delivery;
import com.backend.fooddelivery.model.Order;
import com.backend.fooddelivery.repository.DeliveryRepository;
import com.backend.fooddelivery.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Delivery Service - Handles delivery operations
 */
@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Assign delivery partner to order
     */
    @Transactional
    public Delivery assignDelivery(Long orderId, Long deliveryPartnerId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        Delivery delivery = new Delivery();
        delivery.setOrderId(orderId);
        delivery.setDeliveryPartnerId(deliveryPartnerId);
        delivery.setStatus(Delivery.DeliveryStatus.ASSIGNED);

        // Update order
        order.setDeliveryPartnerId(deliveryPartnerId);
        orderRepository.save(order);

        return deliveryRepository.save(delivery);
    }

    /**
     * Mark delivery as picked up
     */
    @Transactional
    public Delivery markPickedUp(Long deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));

        delivery.setStatus(Delivery.DeliveryStatus.PICKED_UP);
        delivery.setPickedUpAt(LocalDateTime.now());

        return deliveryRepository.save(delivery);
    }

    /**
     * Mark delivery as delivered
     */
    @Transactional
    public Delivery markDelivered(Long deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));

        delivery.setStatus(Delivery.DeliveryStatus.DELIVERED);
        delivery.setDeliveredAt(LocalDateTime.now());

        // Update order status
        Order order = orderRepository.findById(delivery.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(Order.OrderStatus.DELIVERED);
        order.setActualDeliveryTime(LocalDateTime.now());
        orderRepository.save(order);

        return deliveryRepository.save(delivery);
    }

    /**
     * Get deliveries for partner
     */
    public List<Delivery> getPartnerDeliveries(Long deliveryPartnerId) {
        return deliveryRepository.findByDeliveryPartnerId(deliveryPartnerId);
    }
}
