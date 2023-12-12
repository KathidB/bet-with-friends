package com.example.bwfchat.exceptions;

public class UserNotLoggedInException extends RuntimeException{
    public UserNotLoggedInException() {
        super();
    }

    public UserNotLoggedInException(String message) {
        super(message);
    }

    public UserNotLoggedInException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotLoggedInException(Throwable cause) {
        super(cause);
    }

    protected UserNotLoggedInException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
