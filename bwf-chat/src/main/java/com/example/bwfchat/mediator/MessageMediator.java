package com.example.bwfchat.mediator;

import com.example.bwfchat.entity.Message;
import com.example.bwfchat.exceptions.ProfileDontExistException;
import com.example.bwfchat.exceptions.UserNotLoggedInException;
import com.example.bwfchat.services.CookieService;
import com.example.bwfchat.services.JwtService;
import com.example.bwfchat.services.MessageService;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MessageMediator {

    private final JwtService jwtService;
    private final CookieService cookieService;
    private final MessageService messageService;

    public void sendMessage(String message, Cookie[] cookies) throws UserNotLoggedInException, ProfileDontExistException {
            String user_id = validateCookies(cookies);
            messageService.sendMessage(message,user_id);
    }

    public List<Message> getMessage(int page, int limit,Cookie[] cookie) throws UserNotLoggedInException{
        validateCookies(cookie);
        return messageService.getMessage(page,limit);
    }

    public String validateCookies(Cookie[] cookie) throws UserNotLoggedInException{
        String authorization = cookieService.getCookieByKey(cookie, "Authorization");
        String refresh = cookieService.getCookieByKey(cookie, "Refresh");
        return jwtService.validToken(authorization,refresh);
    }
}
