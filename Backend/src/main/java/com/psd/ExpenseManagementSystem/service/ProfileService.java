package com.psd.ExpenseManagementSystem.service;

import com.psd.ExpenseManagementSystem.bean.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    public ProfileRepository userRepo;
    public void registerUser(Profile user) {
        userRepo.save(user);

    }
}
