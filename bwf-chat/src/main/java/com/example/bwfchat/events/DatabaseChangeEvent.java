package com.example.bwfchat.events;

import org.springframework.context.ApplicationEvent;

public class DatabaseChangeEvent extends ApplicationEvent {
    public DatabaseChangeEvent(Object source) {
        super(source);
    }
}
