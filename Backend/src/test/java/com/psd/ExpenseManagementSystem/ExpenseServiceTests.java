package com.psd.ExpenseManagementSystem;
import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.bean.Profile;
import com.psd.ExpenseManagementSystem.repository.ExpenseRepository;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import com.psd.ExpenseManagementSystem.service.ExpenseService;
import com.psd.ExpenseManagementSystem.service.ProfileService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ExpenseServiceTests {
    String authToken = "";
    @MockBean
    private ExpenseRepository userRepo;

    @MockBean
    private ProfileService profileService;

    @Autowired
    private ExpenseService expenseService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

    }

    public Profile login(){
        Profile testUser = new Profile();
        testUser.setEmail("test@example.com");
        testUser.setPassword("password123");
        testUser.setProfile_name("TestUser");
        profileService.registerUser(testUser);

        Profile loginUser = new Profile();

        loginUser.setEmail("temp@gmail.com");
        loginUser.setPassword("1234");
        ResponseEntity<String> result = profileService.loginUser(loginUser);
        authToken= "dGVtcEBnbWFpbC5jb206MTIzNA==";
        return testUser;
    }

    @Test
    public  void testOnlyCurrentMonthExpensesAreRetrieved(){
        Profile user = login();
        List<Integer> expenses = expenseService.getFilteredExpensesForDashboard();
        List<Expense> allExpenses = expenseService.getAllExpenses();
        for (Expense expense : allExpenses){
            if(expense.getProfile_id() == user.getId()){
                assert expenses.contains(expense.getAmount());
            }
        }
    }
}
