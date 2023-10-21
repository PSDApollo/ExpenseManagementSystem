package com.psd.ExpenseManagementSystem.controller;

import com.psd.ExpenseManagementSystem.bean.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.psd.ExpenseManagementSystem.service.ProfileService;

@RestController
public class ProfileController {
    @Autowired
    private ProfileService userService;


    @RequestMapping(method = RequestMethod.POST, value="/register")
    public Long registerUser(@RequestBody Profile user)
    {
        Long id = userService.registerUser(user);
        return id;
    }

    @RequestMapping(method = RequestMethod.POST, value="/login")
    public String loginUser(@RequestBody Profile user)
    {
        return userService.loginUser(user);
    }

    @GetMapping("/")
    public String home() {
        return ("<h1>Welcome</h1>");
    }

    @GetMapping("/admin")
    public String adminhome() {
        return ("<h1>Welcome Admin</h1>");
    }
    @GetMapping("/user")
    public String userhome() {
        return ("<h1>Welcome Usermin</h1>");
    }
}
