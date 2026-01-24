package com.backend.fooddelivery.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {

    @NotNull(message = "Order ID is required")
    private Long orderId;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod; // CASH_ON_DELIVERY, CREDIT_CARD, DEBIT_CARD, UPI, WALLET

    private String transactionId; // For online payments
}
