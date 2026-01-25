package com.backend.fooddelivery.util;

import com.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Rate Limiting Interceptor - Implements rate limiting using Bucket4j
 */
@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    @Autowired
    @Qualifier("loginBucket")
    private Bucket loginBucket;

    @Autowired
    @Qualifier("orderBucket")
    private Bucket orderBucket;

    @Autowired
    @Qualifier("generalBucket")
    private Bucket generalBucket;

    @Value("${rate-limit.enabled:true}")
    private boolean rateLimitEnabled;

    // Per-IP rate limiting buckets
    private final Map<String, Bucket> ipBuckets = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!rateLimitEnabled) {
            return true;
        }

        String path = request.getRequestURI();
        String method = request.getMethod();
        String clientIp = getClientIp(request);
        Bucket bucket = selectBucket(path, clientIp, method);

        if (bucket.tryConsume(1)) {
            return true;
        } else {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Too many requests. Please try again later.\",\"status\":429}");
            return false;
        }
    }

    private Bucket selectBucket(String path, String clientIp, String method) {
        // Login endpoint - use login bucket
        if (path.contains("/api/auth/login")) {
            return loginBucket;
        }

        // Order endpoints - use order bucket
        if (path.contains("/api/orders") && "POST".equals(method)) {
            return orderBucket;
        }

        // General endpoints - use per-IP bucket
        return ipBuckets.computeIfAbsent(clientIp, ip -> generalBucket);
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }
}
