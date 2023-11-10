package com.psd.ExpenseManagementSystem;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.bean.Profile;
import com.psd.ExpenseManagementSystem.repository.ExpenseRepository;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import com.psd.ExpenseManagementSystem.service.ExpenseService;
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

public class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepo;

    @Mock
    private ProfileRepository profileRepo;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private ExpenseService expenseService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllExpenses() {
        // Mocking ExpenseRepository
        when(expenseRepo.findAll()).thenReturn(new ArrayList<>());

        // Test the getAllExpenses method
        List<Expense> result = expenseService.getAllExpenses();

        // Verify that the findAll method is called
        verify(expenseRepo, times(1)).findAll();

        // Verify that the result is an empty list
        assertEquals(0, result.size());
    }

    @Test
    public void testGetAnExpense() {
        // Mocking ExpenseRepository
        when(expenseRepo.findById(anyLong())).thenReturn(Optional.of(new Expense())); // Replace Expense with your actual entity

        // Test the getAnExpense method
        Optional<Expense> result = expenseService.getAnExpense(1L);

        // Verify that the findById method is called with the correct argument
        verify(expenseRepo, times(1)).findById(1L);

        // Verify that the result is present
        assertEquals(true, result.isPresent());
    }

    @Test
    public void testAddExpense() {
        // Mocking HttpServletRequest
        when(request.getHeader("Authorization")).thenReturn("base64encodedstring");

        // Mocking ProfileRepository
        when(profileRepo.findByEmail(anyString())).thenReturn(new Profile()); // Replace YourProfileEntity with your actual entity

        // Mocking ExpenseRepository
        doNothing().when(expenseRepo).save(any(Expense.class));

        // Test the addExpense method
        Expense expenseToAdd = new Expense();
        expenseService.addExpense(expenseToAdd);

        // Verify that the save method is called with the correct arguments
        verify(expenseRepo, times(1)).save(expenseToAdd);
    }

    @Test
    public void testUpdateExpense() {
        // Mocking ExpenseRepository
        doNothing().when(expenseRepo).save(any(Expense.class));

        // Test the updateExpense method
        Expense expenseToUpdate = new Expense();
        expenseService.updateExpense(1L, expenseToUpdate);

        // Verify that the save method is called with the correct arguments
        verify(expenseRepo, times(1)).save(expenseToUpdate);
    }

    @Test
    public void testDeleteExpense() {
        // Test the deleteExpense method
        expenseService.deleteExpense(1L);

        // Verify that the deleteById method is called with the correct argument
        verify(expenseRepo, times(1)).deleteById(1L);
    }
}
