package com.backend.fooddelivery.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Email Service - Handles email notifications
 */
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Send simple email
     */
    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
        } catch (Exception e) {
            // Log error but don't fail the operation
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    /**
     * Send order confirmation email
     */
    public void sendOrderConfirmation(String customerEmail, Long orderId, Double totalAmount) {
        String subject = "Order Confirmation - Order #" + orderId;
        String body = String.format(
                "Thank you for your order!\n\n" +
                        "Order ID: %d\n" +
                        "Total Amount: ₹%.2f\n\n" +
                        "We'll notify you when your order is ready for delivery.\n\n" +
                        "Best regards,\nFood Delivery Team",
                orderId, totalAmount);

        sendEmail(customerEmail, subject, body);
    }

    /**
     * Send delivery notification
     */
    public void sendDeliveryNotification(String customerEmail, Long orderId) {
        String subject = "Your Order is Out for Delivery - Order #" + orderId;
        String body = String.format(
                "Great news!\n\n" +
                        "Your order #%d is now out for delivery.\n" +
                        "It should arrive shortly.\n\n" +
                        "Best regards,\nFood Delivery Team",
                orderId);

        sendEmail(customerEmail, subject, body);
    }
}
