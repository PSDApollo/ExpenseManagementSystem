package com.psd.ExpenseManagementSystem.iterators;

import com.psd.ExpenseManagementSystem.bean.Expense;

import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class ProfileIdAndMonthFilteredExpenseIterator implements Iterator<Integer> {
    private final List<Expense> expenses;
    private int currentIndex;
    private final long expectedProfileId;
    private final int currentMonth;

    public ProfileIdAndMonthFilteredExpenseIterator(List<Expense> expenses, long profileId) {
        this.expenses = expenses;
        this.currentIndex = 0;
        this.expectedProfileId = profileId;
        Calendar calendar = Calendar.getInstance();
        this.currentMonth = calendar.get(Calendar.MONTH) + 1;
    }

    @Override
    public boolean hasNext() {
        while (currentIndex < expenses.size()) {
            Expense currentExpense = expenses.get(currentIndex);
            if (currentExpense.getProfile_id() == expectedProfileId
                    && isExpenseFromCurrentMonth(currentExpense.getExpense_date())) {
                return true;
            }
            currentIndex++;
        }
        return false;
    }

    private boolean isExpenseFromCurrentMonth(Date expenseDate) {
        Calendar expenseCalendar = Calendar.getInstance();
        expenseCalendar.setTime(expenseDate);
        int expenseMonth = expenseCalendar.get(Calendar.MONTH) + 1; // Calendar.MONTH is zero-based
        return expenseMonth == currentMonth;
    }

    @Override
    public Integer next() {
        Expense currentExpense = expenses.get(currentIndex);
        currentIndex++;
        return currentExpense.getAmount();
    }
}
