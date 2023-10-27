package com.psd.ExpenseManagementSystem.service;

import com.psd.ExpenseManagementSystem.bean.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;


// This file is for implementing all the functionalities related to a profile
@Service
public class ProfileService {

    @Autowired
    public ProfileRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;


    // Functionality for creating a new profile.
    public Long registerUser(Profile user) {
        // creating a profile object with all the data.
        Profile profile = new Profile(
                user.getId(),
                user.getEmail(),
                this.passwordEncoder.encode(user.getPassword()),
                user.getProfile_name()
        );
        // using save method we are saving the data to our database.
        userRepo.save(profile);
        // returning the id of the created user from api
        return userRepo.findByEmail(user.getEmail()).getId();
    }


    // Functionality for user login
    public String loginUser(Profile user) {
        // fetching the user information from db if it exists
        Profile user1 = userRepo.findByEmail(user.getEmail());
        if (user1 != null) {
            // If a user is found with the given email, we are entering this point
            String user1_password = user1.getPassword();
            // Fetching the password from request and the database and comparing both of the passwords.
            if(passwordEncoder.matches(user.getPassword(), user1_password)) {
                String temp = user.getEmail() + ":" + user.getPassword();
                // returning the encoded key for further usage(maintaining the session)
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
