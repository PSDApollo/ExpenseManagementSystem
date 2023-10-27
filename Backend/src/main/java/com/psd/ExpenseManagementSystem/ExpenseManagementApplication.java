package com.psd.ExpenseManagementSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@ComponentScan(basePackages = "com.psd.ExpenseManagementSystem")
public class ExpenseManagementApplication {

	// main function running spring boot application
	public static void main(String[] args) {
		SpringApplication.run(ExpenseManagementApplication.class, args);
	}

}
