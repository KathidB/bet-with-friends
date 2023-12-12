package com.example.bwfchat.services;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

    public String getCookieByKey(Cookie[] cookies,String key){
        for (Cookie cookie:cookies) {
            if (cookie.getName().equals(key)){
                return cookie.getValue();
            }
        }
        return "";
    }
}
