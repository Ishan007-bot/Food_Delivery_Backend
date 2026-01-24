package com.backend.fooddelivery.service;

import com.backend.fooddelivery.dto.request.PaymentRequest;
import com.backend.fooddelivery.exception.BadRequestException;
import com.backend.fooddelivery.exception.ResourceNotFoundException;
import com.backend.fooddelivery.model.Order;
import com.backend.fooddelivery.model.Payment;
import com.backend.fooddelivery.repository.OrderRepository;
import com.backend.fooddelivery.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Payment Service - Handles payment processing
 */
@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Process payment for order
     */
    @Transactional
    public Payment processPayment(PaymentRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        // Check if payment already exists
        if (paymentRepository.findByOrderId(order.getId()).isPresent()) {
            throw new BadRequestException("Payment already processed for this order");
        }

        Payment.PaymentMethod method;
        try {
            method = Payment.PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid payment method");
        }

        Payment payment = new Payment();
        payment.setOrderId(order.getId());
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod(method);
        payment.setTransactionId(request.getTransactionId());

        // For COD, mark as pending; for online, mark as completed
        if (method == Payment.PaymentMethod.CASH_ON_DELIVERY) {
            payment.setStatus(Payment.PaymentStatus.PENDING);
        } else {
            payment.setStatus(Payment.PaymentStatus.COMPLETED);
        }

        return paymentRepository.save(payment);
    }

    /**
     * Get payment by order ID
     */
    public Payment getPaymentByOrderId(Long orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found for order"));
    }

    /**
     * Update payment status
     */
    @Transactional
    public Payment updatePaymentStatus(Long paymentId, String status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        Payment.PaymentStatus newStatus;
        try {
            newStatus = Payment.PaymentStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid payment status");
        }

        payment.setStatus(newStatus);
        return paymentRepository.save(payment);
    }
}
