package com.backend.fooddelivery.controller;

import com.backend.fooddelivery.dto.request.PaymentRequest;
import com.backend.fooddelivery.model.Payment;
import com.backend.fooddelivery.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Payment Controller - Handles payment operations
 */
@RestController
@RequestMapping("/api/payments")
@Tag(name = "Payment Management", description = "Payment processing APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    /**
     * Process payment
     */
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Process payment", description = "Process payment for an order")
    public ResponseEntity<Payment> processPayment(@Valid @RequestBody PaymentRequest request) {
        Payment payment = paymentService.processPayment(request);
        return new ResponseEntity<>(payment, HttpStatus.CREATED);
    }

    /**
     * Get payment by order ID
     */
    @GetMapping("/order/{orderId}")
    @Operation(summary = "Get payment by order", description = "Get payment details for an order")
    public ResponseEntity<Payment> getPaymentByOrderId(@PathVariable Long orderId) {
        Payment payment = paymentService.getPaymentByOrderId(orderId);
        return ResponseEntity.ok(payment);
    }

    /**
     * Update payment status (Admin only)
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update payment status", description = "Update payment status (Admin only)")
    public ResponseEntity<Payment> updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        Payment payment = paymentService.updatePaymentStatus(id, status);
        return ResponseEntity.ok(payment);
    }

    /**
     * Create Razorpay order
     */
    @PostMapping("/razorpay/order/{orderId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Create Razorpay order", description = "Create a payment order in Razorpay")
    public ResponseEntity<Map<String, Object>> createRazorpayOrder(@PathVariable Long orderId) {
        Map<String, Object> order = paymentService.createRazorpayOrder(orderId);
        return ResponseEntity.ok(order);
    }

    /**
     * Verify Razorpay payment
     */
    @PostMapping("/razorpay/verify/{paymentId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Verify Razorpay payment", description = "Verify and capture Razorpay payment")
    public ResponseEntity<Payment> verifyRazorpayPayment(
            @PathVariable Long paymentId,
            @RequestParam String razorpayOrderId,
            @RequestParam String razorpayPaymentId,
            @RequestParam String razorpaySignature) {
        Payment payment = paymentService.verifyRazorpayPayment(
                paymentId, razorpayOrderId, razorpayPaymentId, razorpaySignature);
        return ResponseEntity.ok(payment);
    }
}
