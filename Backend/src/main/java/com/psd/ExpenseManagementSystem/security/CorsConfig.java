package com.psd.ExpenseManagementSystem.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


// This file is used for allowing a user request from frontend and for solving issues related to CORS.
@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // Allowing the frontend origin for enabling CORS.
                .allowedOrigins("http://localhost:3000")
                // Defining the type of requests
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                // Defining the allowed headers.
                .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization")
                .allowCredentials(true);
    }
}

