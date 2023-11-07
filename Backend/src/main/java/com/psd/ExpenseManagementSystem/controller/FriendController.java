package com.psd.ExpenseManagementSystem.controller;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.bean.Friend;
import com.psd.ExpenseManagementSystem.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FriendController {
    @Autowired
    private FriendService friendService;

    @RequestMapping(method = RequestMethod.POST, value="/friends")
    public void addFriend(@RequestBody Friend friend)
    {
        friendService.addFriend(friend);
    }
}
