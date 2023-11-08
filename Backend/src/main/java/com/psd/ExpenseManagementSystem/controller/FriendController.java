package com.psd.ExpenseManagementSystem.controller;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.bean.Friend;
import com.psd.ExpenseManagementSystem.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FriendController {
    @Autowired
    private FriendService friendService;

    @RequestMapping(method = RequestMethod.POST, value="/friends")
    public void addFriend(@RequestBody Friend friend)
    {
        friendService.addFriend(friend);
    }

    @RequestMapping("/friends")
    public List<Friend> getAllFriends()
    {
        return friendService.getAllFriends();
    }


    @RequestMapping(method = RequestMethod.GET, value = "/friends/{id}")
    public Optional<Friend> getFriend(@PathVariable long id)
    {
        return friendService.getFriend(id);
    }

}
