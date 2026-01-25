package com.backend.fooddelivery.config;

import com.bucket4j.Bandwidth;
import com.bucket4j.Bucket;
import com.bucket4j.Refill;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

/**
 * Rate Limiting Configuration using Bucket4j
 */
@Configuration
public class RateLimitConfig {

    @Value("${rate-limit.login.capacity:5}")
    private int loginCapacity;

    @Value("${rate-limit.login.refill-tokens:5}")
    private int loginRefillTokens;

    @Value("${rate-limit.login.refill-duration:1}")
    private int loginRefillDuration;

    @Value("${rate-limit.order.capacity:10}")
    private int orderCapacity;

    @Value("${rate-limit.order.refill-tokens:10}")
    private int orderRefillTokens;

    @Value("${rate-limit.order.refill-duration:1}")
    private int orderRefillDuration;

    @Value("${rate-limit.general.capacity:100}")
    private int generalCapacity;

    @Value("${rate-limit.general.refill-tokens:100}")
    private int generalRefillTokens;

    @Value("${rate-limit.general.refill-duration:1}")
    private int generalRefillDuration;

    @Bean(name = "loginBucket")
    public Bucket loginBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.classic(loginCapacity, Refill.intervally(loginRefillTokens, Duration.ofMinutes(loginRefillDuration))))
                .build();
    }

    @Bean(name = "orderBucket")
    public Bucket orderBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.classic(orderCapacity, Refill.intervally(orderRefillTokens, Duration.ofMinutes(orderRefillDuration))))
                .build();
    }

    @Bean(name = "generalBucket")
    public Bucket generalBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.classic(generalCapacity, Refill.intervally(generalRefillTokens, Duration.ofMinutes(generalRefillDuration))))
                .build();
    }
}
