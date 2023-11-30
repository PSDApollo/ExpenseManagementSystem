package com.psd.ExpenseManagementSystem.controller;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.bean.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import com.psd.ExpenseManagementSystem.service.ProfileService;
import com.psd.ExpenseManagementSystem.service.UserProfileDto;

import java.util.List;


// This file is used for defining all the routes related to a profile.
@RestController
public class ProfileController {
    @Autowired
    private ProfileService userService;


    // Defining a route for registering a user.
    @RequestMapping(method = RequestMethod.POST, value="/register")
    public Long registerUser(@RequestBody Profile user)
    {
        Long id = userService.registerUser(user);
        return id;
    }


    // Defining a route for profile login.
    @RequestMapping(method = RequestMethod.POST, value="/login")
    public ResponseEntity<String> loginUser(@RequestBody Profile user)
    {
        return userService.loginUser(user);
    }

    @RequestMapping("/users")
    public List<UserProfileDto> getAllExpenses()
    {
        return userService.getAllUsers();
    }


}
