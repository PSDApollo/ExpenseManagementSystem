package com.psd.ExpenseManagementSystem.bean;

import javax.persistence.*;

@Entity
@Table(name="Profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    private String user_name;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String password;


    public Profile() {

    }
    public Profile(long id, String user_name, String password) {
        super();
        this.id = id;
        this.user_name = user_name;
        this.password = password;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

}