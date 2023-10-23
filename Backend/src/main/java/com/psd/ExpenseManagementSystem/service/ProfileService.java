package com.psd.ExpenseManagementSystem.service;

import com.psd.ExpenseManagementSystem.bean.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Objects;

@Service
public class ProfileService {

    @Autowired
    public ProfileRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Long registerUser(Profile user) {
        Profile profile = new Profile(
                user.getId(),
                user.getEmail(),
                this.passwordEncoder.encode(user.getPassword()),
                user.getProfile_name()
        );
        userRepo.save(profile);
        return userRepo.findByEmail(user.getEmail()).getId();

    }

    public String loginUser(Profile user) {
        Profile user1 = userRepo.findByEmail(user.getEmail());
        if (user1 != null) {
            String user1_password = user1.getPassword();
            if(passwordEncoder.matches(user.getPassword(), user1_password)) {
                String temp = user.getEmail() + ":" + user.getPassword();
                return Base64.getEncoder().encodeToString(temp.getBytes());
            }
            else{
                return "Incorrect Email or password";
            }

        } else {
            return "user not found";
        }
    }
}
