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
}
