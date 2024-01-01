package com.example.bwfchat.mediator;

import com.example.bwfchat.entity.SystemInfo;
import com.example.bwfchat.services.SystemInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SystemInfoMediator {
    private final SystemInfoService systemInfoService;

    public long getTotalCount(String userId){
        return systemInfoService.getTotalCount(userId);
    }

    public List<SystemInfo> getSystemInfo(int page, int limit, String userId){
       return systemInfoService.getSystemInfo(userId,page,limit);
    }
}
