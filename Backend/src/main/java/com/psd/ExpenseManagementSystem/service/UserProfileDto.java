package com.psd.ExpenseManagementSystem.service;

public class UserProfileDto {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileName() {
        return profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    private Long id;
    private String email;
    private String profileName;

    public UserProfileDto(Long id, String email, String profileName) {
        this.id = id;
        this.email = email;
        this.profileName = profileName;
    }
}