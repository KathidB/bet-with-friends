package com.example.bwfchat.mediator;

import com.example.bwfchat.entity.SystemInfo;
import com.example.bwfchat.services.SystemInfoService;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SystemInfoMediator {

    @Value("${APP-TOKEN}")
    private String APPTOKEN;
    private final MessageMediator messageMediator;
    private final SystemInfoService systemInfoService;

    public long getTotalCount(String userId){
        return systemInfoService.getTotalCount(userId);
    }

    public List<SystemInfo> getSystemInfo(int page, int limit, String userId){
       return systemInfoService.getSystemInfo(userId,page,limit);
    }

    public void send(SystemInfo systemInfo, String token) throws RuntimeException{
        if (token.equals(APPTOKEN)){
            systemInfoService.save(systemInfo);
            return;
        }
        throw new RuntimeException();
    }

    public void readSystemInfo(String uuid, Cookie[] cookies) {
        messageMediator.validateCookies(cookies);
        systemInfoService.read(uuid);
    }
}
