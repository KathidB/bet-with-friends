package com.example.bwfchat.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class Response {
    private String message;
    private String code;
    private String timestamp;

    public Response(String message, String code) {
        this.message = message;
        this.code = code;
        this.timestamp = String.valueOf(new Timestamp(System.currentTimeMillis()));
    }
}
