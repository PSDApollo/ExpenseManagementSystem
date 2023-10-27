package com.psd.ExpenseManagementSystem.bean;

import javax.persistence.*;

@Entity
@Table(name="Profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;


    @Column(unique = true)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;

    private String profile_name;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String password;


    public Profile() {

    }

    public String getProfile_name() {
        return profile_name;
    }

    public void setProfile_name(String profile_name) {
        this.profile_name = profile_name;
    }

    public Profile(long id, String email, String password, String profile_name) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.profile_name = profile_name;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

}