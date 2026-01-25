package com.backend.fooddelivery.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Razorpay Payment Gateway Service (Mock Implementation)
 * This is a mock service that simulates Razorpay payment gateway integration
 * In production, this would use the actual Razorpay SDK
 */
@Service
public class RazorpayService {

    @Value("${razorpay.key.id:rzp_test_mock_key}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret:rzp_test_mock_secret}")
    private String razorpayKeySecret;

    /**
     * Create a payment order in Razorpay
     * @param amount Amount in rupees
     * @param currency Currency code (default: INR)
     * @return Payment order details
     */
    public Map<String, Object> createPaymentOrder(Double amount, String currency) {
        // Mock Razorpay order creation
        String orderId = "order_" + UUID.randomUUID().toString().replace("-", "");
        
        Map<String, Object> orderDetails = new HashMap<>();
        orderDetails.put("id", orderId);
        orderDetails.put("amount", (int)(amount * 100)); // Convert to paise
        orderDetails.put("currency", currency != null ? currency : "INR");
        orderDetails.put("status", "created");
        orderDetails.put("key_id", razorpayKeyId);
        orderDetails.put("created_at", System.currentTimeMillis() / 1000);
        
        return orderDetails;
    }

    /**
     * Verify payment signature (mock implementation)
     * @param razorpayOrderId Order ID from Razorpay
     * @param razorpayPaymentId Payment ID from Razorpay
     * @param razorpaySignature Signature from Razorpay
     * @return true if signature is valid (mock always returns true)
     */
    public boolean verifyPaymentSignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        // In production, this would verify the signature using HMAC SHA256
        // Mock implementation - always returns true for demo purposes
        if (razorpayOrderId == null || razorpayPaymentId == null || razorpaySignature == null) {
            return false;
        }
        
        // Mock signature verification
        String expectedSignature = generateMockSignature(razorpayOrderId, razorpayPaymentId);
        return expectedSignature.equals(razorpaySignature) || razorpaySignature.startsWith("sig_");
    }

    /**
     * Generate mock signature for testing
     */
    private String generateMockSignature(String orderId, String paymentId) {
        return "sig_" + orderId.substring(0, 8) + paymentId.substring(0, 8);
    }

    /**
     * Capture payment (mock implementation)
     * @param paymentId Payment ID from Razorpay
     * @param amount Amount to capture
     * @return Payment capture details
     */
    public Map<String, Object> capturePayment(String paymentId, Double amount) {
        Map<String, Object> captureDetails = new HashMap<>();
        captureDetails.put("id", paymentId);
        captureDetails.put("status", "captured");
        captureDetails.put("amount", (int)(amount * 100));
        captureDetails.put("currency", "INR");
        captureDetails.put("captured_at", System.currentTimeMillis() / 1000);
        
        return captureDetails;
    }
}
