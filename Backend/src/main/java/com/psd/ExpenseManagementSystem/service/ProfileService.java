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

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;


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
                user.getProfile_name(),
                1000L
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
        userRepo.findAll().forEach(profile -> userDtos.add(convertProfileToUserProfileDto(profile)));
        return userDtos;
    }

    private UserProfileDto convertProfileToUserProfileDto(Profile profile) {
        // Map the properties from Profile to UserProfileDto
        return new UserProfileDto(profile.getId(), profile.getEmail(), profile.getProfile_name(), profile.getExpenseLimit());
    }

    public List<UserProfileDto> getUsersByEmail(String email) {
        return getAllUsers()
                .stream()
                .filter(userDto -> userDto.getEmail().equalsIgnoreCase(email))
                .collect(Collectors.toList());
    }

    public UserProfileDto getUserByProfileId(long profileId) {
        return getAllUsers()
                .stream()
                .filter(userDto -> userDto.getId()==profileId)
                .collect(Collectors.toList()).get(0);
    }

    // Modify the method to accept UserProfileDto
    public ResponseEntity<String> updateProfileByEmail(UserProfileDto userProfileDto) {
        Profile existingUser = userRepo.findByEmail(userProfileDto.getEmail());
        if (existingUser != null) {
            existingUser.setProfile_name(userProfileDto.getProfileName());
            existingUser.setExpenseLimit((long)userProfileDto.getExpenseLimit());
            System.out.println(existingUser.getExpenseLimit());
            // Save the updated profile
            userRepo.save(existingUser);

            return ResponseEntity.ok("Profile updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
