package com.backend.fooddelivery.food_delivery_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.backend.fooddelivery")
@EnableJpaRepositories(basePackages = "com.backend.fooddelivery.repository")
@EntityScan(basePackages = "com.backend.fooddelivery.model")
@EnableCaching
public class FoodDeliverySystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodDeliverySystemApplication.class, args);
	}

}
