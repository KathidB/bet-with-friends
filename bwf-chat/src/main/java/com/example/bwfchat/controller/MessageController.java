package com.example.bwfchat.controller;

import com.example.bwfchat.entity.Message;
import com.example.bwfchat.entity.Profile;
import com.example.bwfchat.entity.Response;
import com.example.bwfchat.entity.SystemInfo;
import com.example.bwfchat.events.DatabaseChangeService;
import com.example.bwfchat.events.DatabaseChangeServiceSystemInfo;
import com.example.bwfchat.mediator.MessageMediator;
import com.example.bwfchat.mediator.SystemInfoMediator;
import com.example.bwfchat.services.JwtService;
import com.example.bwfchat.services.SystemInfoService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import reactor.core.publisher.Flux;
import java.util.List;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000","http://130.162.44.103:3000","http://130.162.44.103:5000","http://localhost:5000"},allowCredentials = "include", maxAge = 3600)
public class MessageController {

    private final MessageMediator messageMediator;
    private final SystemInfoMediator systemInfoMediator;
    private final DatabaseChangeService databaseChangeService;
    private final DatabaseChangeServiceSystemInfo databaseChangeServiceSystemInfo;

    @QueryMapping
    public List<Message> getMessages(@Argument int page,@Argument  int limit){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest httpServletRequest = attributes.getRequest();
        Cookie[] cookies = httpServletRequest.getCookies();
        HttpServletResponse httpServletResponse = attributes.getResponse();
        httpServletResponse.addHeader("X-Total-Count", String.valueOf(messageMediator.getTotalCount()));
        return messageMediator.getMessage(page-1, limit,cookies);
    }

    @QueryMapping
    public List<SystemInfo> getSystemInfo(@Argument int page, @Argument  int limit){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest httpServletRequest = attributes.getRequest();
        Cookie[] cookies = httpServletRequest.getCookies();
        HttpServletResponse httpServletResponse = attributes.getResponse();
        String userID = messageMediator.validateCookies(cookies);
        httpServletResponse.addHeader("X-Total-Count", String.valueOf(systemInfoMediator.getTotalCount(userID)));
        return systemInfoMediator.getSystemInfo(page-1, limit,userID);
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
    public Response readSystemInfo(@Argument String uuid){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest httpServletRequest = attributes.getRequest();
        Cookie[] cookies = httpServletRequest.getCookies();
        systemInfoMediator.readSystemInfo(uuid,cookies);

        return new Response("Message has been read","OK");
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
        return databaseChangeService.databaseChangeStream().map(event -> (Message) event.getSource());
    }

    @SubscriptionMapping
    public Flux<SystemInfo> newSystemInfoSubscription(){
        return databaseChangeServiceSystemInfo.databaseChangeStream().map(event -> (SystemInfo) event.getSource());
    }
}
