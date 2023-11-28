package com.psd.ExpenseManagementSystem.bean;

import javax.persistence.*;

@Entity
@Table(name="Friend")
public class Friend {
    @Id
    // This is used to create a id automatically in a sequence
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;
    private String name;

    public long getFriend_id() {
        return friend_id;
    }

    public void setFriend_id(long friend_id) {
        this.friend_id = friend_id;
    }

    private long friend_id;

    private long profile_id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getProfile_id() {
        return profile_id;
    }

    public void setProfile_id(long profile_id) {
        this.profile_id = profile_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;

    public Friend() {

    }

    public Friend(long id, String name, long profile_id, String email, long friend_id) {
        super();
        this.id = id;
        this.name = name;
        this.profile_id = profile_id;
        this.email = email;
        this.friend_id = friend_id;
    }
}
