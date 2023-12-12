package com.example.bwfchat.exceptions;

public class ProfileDontExistException extends RuntimeException{
    public ProfileDontExistException() {
        super();
    }

    public ProfileDontExistException(String message) {
        super(message);
    }

    public ProfileDontExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProfileDontExistException(Throwable cause) {
        super(cause);
    }

    protected ProfileDontExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
