package com.example.bwfchat.mediator;

import com.example.bwfchat.entity.Message;
import com.example.bwfchat.exceptions.ProfileDontExistException;
import com.example.bwfchat.exceptions.UserNotLoggedInException;
import com.example.bwfchat.services.CookieService;
import com.example.bwfchat.services.JwtService;
import com.example.bwfchat.services.MessageService;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MessageMediator {

    private final JwtService jwtService;
    private final CookieService cookieService;
    private final MessageService messageService;
    @Value("${be.url.avatar}")
    private String AVATAR_URL;

    public void sendMessage(String message, Cookie[] cookies) throws UserNotLoggedInException, ProfileDontExistException {
            String userId = validateCookies(cookies);
            messageService.sendMessage(message,userId);
    }
    public long getTotalCount(){
      return messageService.getTotalCount();
    }
    public List<Message> getMessage(int page, int limit,Cookie[] cookie) throws UserNotLoggedInException{
        validateCookies(cookie);
        List<Message> messages = messageService.getMessage(page,limit);
        messages.forEach(value -> {
            String avatar = value.getSender().getAvatar();
            if (!avatar.startsWith("http") && !avatar.startsWith("https")) {
                value.getSender().setAvatar(AVATAR_URL + avatar);
            }
        });
        return messages;
    }

    public String validateCookies(Cookie[] cookie) throws UserNotLoggedInException{
        String authorization = cookieService.getCookieByKey(cookie, "Authorization");
        String refresh = cookieService.getCookieByKey(cookie, "Refresh");
        return jwtService.validToken(authorization,refresh);
    }

    public void sendReaction(String uuid, boolean isDelete, Cookie[] cookies, String messageUuid) {
        //String userId = validateCookies(cookies);
        String userId = "deec3ac8-7bd7-4c09-a958-845b5e2cda8d";
        messageService.processReaction(userId,uuid,isDelete,messageUuid);
    }
}
