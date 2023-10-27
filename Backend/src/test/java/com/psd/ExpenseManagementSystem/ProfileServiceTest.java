package com.psd.ExpenseManagementSystem;

import com.psd.ExpenseManagementSystem.bean.Profile;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import com.psd.ExpenseManagementSystem.service.ProfileService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProfileServiceTest {


    @MockBean
    private ProfileRepository userRepo;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ProfileService profileService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public  void testRegisterUser(){
        // Creating a profile object
        Profile profile = new Profile(1, "test@gmail.com", "password", "Test User");
        // saving it in the test repo directly and getting the result
        when(userRepo.save(profile)).thenReturn(profile);
        // Verifying the result by using service class.
        assertEquals(profile, profileService.registerUser(profile));
    }


    @Test
    public void testLoginWithCorrectCredentials() {
        // Creating a dummy user for verifying login
        Profile testUser = new Profile();
        testUser.setEmail("test@example.com");
        testUser.setPassword("password123");
        testUser.setProfile_name("TestUser");
        profileService.registerUser(testUser);

        // Object for login
        Profile loginUser = new Profile();

        loginUser.setEmail("temp@gmail.com");
        loginUser.setPassword("1234");
        // Getting result of loginUser functionality
        String result = profileService.loginUser(loginUser);
        String authToken = "dGVtcEBnbWFpbC5jb206MTIzNA==";
        // Comparing expected and actual results
        assertEquals(authToken, result);
    }



    @Test
    public void testLoginUserIncorrectPassword() {
        // Create a mock user
        Profile user = new Profile(1L, "user@example.com", "password", "John");

        // Mock the userRepo.findByEmail method
        when(userRepo.findByEmail("user@example.com")).thenReturn(user);

        // Mock the passwordEncoder.matches method for incorrect password
        when(passwordEncoder.matches("wrongpassword", user.getPassword())).thenReturn(false);

        // Call the loginUser method with incorrect password
        String result = profileService.loginUser(new Profile(1L, "user@example.com", "wrongpassword", "John"));

        // Assertions
        assertEquals("Incorrect Email or password", result);
    }

    @Test
    public void testLoginWithNonExistentUser() {
        // Create a test user with a non-existent email
        Profile loginUser = new Profile();
        loginUser.setEmail("nonexistent@example.com");
        loginUser.setPassword("password123");

        // Call the loginUser method and capture the result
        String result = profileService.loginUser(loginUser);

        // Asserting that the result is as expected (e.g., "user not found")
        assertEquals("user not found", result);
    }


}
