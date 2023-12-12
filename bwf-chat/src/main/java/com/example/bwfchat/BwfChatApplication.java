package com.example.bwfchat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class BwfChatApplication {

    public static void main(String[] args) {
        SpringApplication.run(BwfChatApplication.class, args);
    }

}
