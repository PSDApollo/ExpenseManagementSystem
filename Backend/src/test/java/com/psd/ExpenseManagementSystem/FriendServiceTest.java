package com.psd.ExpenseManagementSystem;

import com.psd.ExpenseManagementSystem.bean.Friend;
import com.psd.ExpenseManagementSystem.bean.Profile;
import com.psd.ExpenseManagementSystem.repository.FriendRepository;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import com.psd.ExpenseManagementSystem.service.FriendService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class FriendServiceTest {

    @Mock
    private FriendRepository friendRepo;

    @Mock
    private ProfileRepository profileRepo;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private FriendService friendService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddFriend() {
        // Mocking HttpServletRequest
        when(request.getHeader("Authorization")).thenReturn("base64encodedstring");

        // Mocking ProfileRepository
        when(profileRepo.findByEmail(anyString())).thenReturn(new Profile()); // Replace YourProfileEntity with your actual entity

        // Mocking FriendRepository
        when(friendRepo.save(any(Friend.class))).thenReturn(new Friend()); // Adjust the return type based on your actual return type

        // Test the addFriend method
        Friend friendToAdd = new Friend();
        friendService.addFriend(friendToAdd);

        // Verify that the save method is called with the correct arguments
        verify(friendRepo, times(1)).save(friendToAdd);
    }

    @Test
    public void testGetFriend() {
        // Mocking FriendRepository
        when(friendRepo.findById(anyLong())).thenReturn(Optional.of(new Friend())); // Replace Friend with your actual entity

        // Test the getFriend method
        Optional<Friend> result = friendService.getFriend(1L);

        // Verify that the findById method is called with the correct argument
        verify(friendRepo, times(1)).findById(1L);

        // Verify that the result is present
        assertEquals(true, result.isPresent());
    }
}

