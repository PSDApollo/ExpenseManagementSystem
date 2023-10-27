package com.psd.ExpenseManagementSystem.security;

import com.psd.ExpenseManagementSystem.bean.Profile;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;


// This file is used for maintaining a user session.
@Component
public class CustomSessionFilter extends OncePerRequestFilter {

    @Autowired
    public ProfileRepository userRepo;

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String userName = null;
        String userPassword = null;
        if (header!=null){
            byte[] decodedBytes = Base64.getDecoder().decode(header);
            String decodedString = new String(decodedBytes);
            userName = decodedString.split(":")[0];
            userPassword = decodedString.split(":")[1];
        }
        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Rechecking whether the user is present in the database or not.
            Profile profileData = this.userRepo.findByEmail(userName);
            UserDetails userDetails = (UserDetails) new User(profileData.getEmail(),profileData.getPassword(),new ArrayList());

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            usernamePasswordAuthenticationToken
                    .setDetails((new WebAuthenticationDetailsSource()).buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication((Authentication)usernamePasswordAuthenticationToken);
        }
        filterChain.doFilter((ServletRequest)request, (ServletResponse)response);
    }
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}