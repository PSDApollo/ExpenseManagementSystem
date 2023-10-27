package com.psd.ExpenseManagementSystem.repository;

import com.psd.ExpenseManagementSystem.bean.Profile;
import org.springframework.data.repository.CrudRepository;


// Initializing a repository for storing profile information.
public interface ProfileRepository extends CrudRepository<Profile,Long> {
    Profile findByEmail(String email);
}
