package com.psd.ExpenseManagementSystem.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.Filter;


// This file is for adding security configuration using spring security.
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomSessionFilter customSessionFilter;

    public SecurityConfiguration() {
        System.out.println("SecurityConfiguration loaded!");
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Setting the configuration on the auth object
        auth.inMemoryAuthentication()
                .withUser("blah")
                .password("blah")
                .roles("USER")
                .and()
                .withUser("foo")
                .password("foo")
                .roles("ADMIN");
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }


    // This method is used for enabling the type of http requests for accessing the database.
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                    .antMatchers("/register").permitAll()
                    .antMatchers("/login").permitAll()
                    .antMatchers("/expenses").permitAll()
                .anyRequest().authenticated()
                .and().httpBasic()
                .and().cors();
        http.addFilterBefore((Filter)this.customSessionFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
