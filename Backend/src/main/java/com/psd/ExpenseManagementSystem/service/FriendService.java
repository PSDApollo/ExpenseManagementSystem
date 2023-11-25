package com.psd.ExpenseManagementSystem.service;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.bean.Friend;
import com.psd.ExpenseManagementSystem.bean.Profile;
import com.psd.ExpenseManagementSystem.repository.FriendRepository;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendService {
    @Autowired
    public FriendRepository friendRepo;

    @Autowired
    ProfileRepository userRepo;

    @Autowired
    private HttpServletRequest request;

    public String getHeaders(){
        return request.getHeader("Authorization");
    }

    public long getProfileIdFromHeader(){
        byte[] decodedBytes = Base64.getDecoder().decode(getHeaders());
        String decodedString = new String(decodedBytes);
        decodedString = decodedString.split(":")[0];
        return userRepo.findByEmail(decodedString).getId();
    }

    public void addFriend(Friend friend) {
        long profile_id = getProfileIdFromHeader();
        friend.setProfile_id(profile_id);
        userRepo.findById(friend.getFriend_id()).ifPresent(profile -> {
            String email = profile.getEmail();
            String name = profile.getProfile_name();
            friend.setEmail(email);
            friend.setName(name);
        });
        friendRepo.save(friend);
    }

    public List<Friend> getAllFriends()
    {
        long profile_id = getProfileIdFromHeader();
        List<Friend> friends = new ArrayList<>();
        friendRepo.findAll().forEach(friends::add);
        List<Friend> filteredFriends = friends.stream()
                .filter(friend -> friend.getProfile_id() == profile_id)
                .collect(Collectors.toList());

        return filteredFriends;
    }

    public Optional<Friend> getFriend(long id)
    {
        return friendRepo.findById(id);
    }
}
