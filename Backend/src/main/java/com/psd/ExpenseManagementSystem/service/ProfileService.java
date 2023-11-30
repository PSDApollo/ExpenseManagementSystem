package com.psd.ExpenseManagementSystem.service;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.bean.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;



// This file is for implementing all the functionalities related to a profile
@Service
public class ProfileService {

    @Autowired
    public ProfileRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

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
    public ResponseEntity<String> loginUser(Profile user) {
        // fetching the user information from db if it exists
        Profile user1 = userRepo.findByEmail(user.getEmail());
        if (user1 != null) {
            // If a user is found with the given email, we are entering this point
            String user1_password = user1.getPassword();
            // Fetching the password from request and the database and comparing both of the passwords.
            if(passwordEncoder.matches(user.getPassword(), user1_password)) {
                String temp = user.getEmail() + ":" + user.getPassword();
                // returning the encoded key for further usage(maintaining the session)
                return ResponseEntity.ok(Base64.getEncoder().encodeToString(temp.getBytes()));
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect Email or password");
            }

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    public List<UserProfileDto> getAllUsers() {
        List<UserProfileDto> userDtos = new ArrayList<>();
        userRepo.findAll().forEach(profile -> {
            if (profile.getId() != getProfileIdFromHeader()) {
                userDtos.add(convertProfileToUserProfileDto(profile));
            }
        });
        return userDtos;
    }

    private UserProfileDto convertProfileToUserProfileDto(Profile profile) {
        // Map the properties from Profile to UserProfileDto
        return new UserProfileDto(profile.getId(), profile.getEmail(), profile.getProfile_name());
    }
}
