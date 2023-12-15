package com.example.bwfchat.controller;

import com.example.bwfchat.entity.Message;
import com.example.bwfchat.entity.Profile;
import com.example.bwfchat.entity.Response;
import com.example.bwfchat.events.DatabaseChangeService;
import com.example.bwfchat.mediator.MessageMediator;
import com.example.bwfchat.services.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import reactor.core.publisher.Flux;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final MessageMediator messageMediator;
    private final DatabaseChangeService databaseChangeService;

    @QueryMapping
    public List<Message> getMessages(@Argument int page,@Argument  int limit){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest httpServletRequest = attributes.getRequest();
        Cookie[] cookies = httpServletRequest.getCookies();
        HttpServletResponse httpServletResponse = attributes.getResponse();
        httpServletResponse.addHeader("X-Total-Count", String.valueOf(messageMediator.getTotalCount()));
        return messageMediator.getMessage(page, limit,cookies);
    }

    @MutationMapping
    public Response sendMessage(@Argument String message){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest httpServletRequest = attributes.getRequest();
        Cookie[] cookies = httpServletRequest.getCookies();
        messageMediator.sendMessage(message,cookies);

        return new Response("Message has been send","OK");
    }

    @MutationMapping
    public Response sendReaction(@Argument String uuid,@Argument boolean isDelete,@Argument String messageUuid){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest httpServletRequest = attributes.getRequest();
        Cookie[] cookies = httpServletRequest.getCookies();
        messageMediator.sendReaction(uuid,isDelete,cookies,messageUuid);

        return new Response("Reaction has been send","OK");
    }


    @SubscriptionMapping
    public Flux<Message> newMessageSubscription(){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest httpServletRequest = attributes.getRequest();
        Cookie[] cookies = httpServletRequest.getCookies();
        messageMediator.validateCookies(cookies);
        return databaseChangeService.databaseChangeStream().map(event -> (Message) event.getSource());
    }
}
