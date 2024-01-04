package com.example.bwfchat.services;

import com.example.bwfchat.entity.SystemInfo;
import com.example.bwfchat.exceptions.ProfileDontExistException;
import com.example.bwfchat.repository.ProfileRepository;
import com.example.bwfchat.repository.SystemInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

@Service
@RequiredArgsConstructor
public class SystemInfoService {

    private final SystemInfoRepository systemInfoRepository;
    private final ProfileRepository profileRepository;

    public long getTotalCount(String userId){
        AtomicLong totalCount = new AtomicLong();
        profileRepository.findProfileByUser(userId).ifPresentOrElse(value->{
            totalCount.set(systemInfoRepository.countSystemInfoByProfileId(value.getId()));
        },()->{throw new ProfileDontExistException();});
        return totalCount.get();
    }

    public List<SystemInfo> getSystemInfo(String userId,int page, int limit){
        List<SystemInfo> systemInfoList = new ArrayList<>();
        profileRepository.findProfileByUser(userId).ifPresentOrElse(value->{
            systemInfoList.addAll(systemInfoRepository.findAll(page,limit, (int) value.getId()));
        },()->{throw new ProfileDontExistException();});
        return systemInfoList;
    }

    public void save(SystemInfo systemInfo) {
        systemInfo.setUuid(UUID.randomUUID().toString());
        systemInfoRepository.save(systemInfo);
    }

    public void read(String uuid) {
        SystemInfo systemInfo = systemInfoRepository.findByUuid(uuid);
        systemInfo.setStatus(true);
        systemInfoRepository.save(systemInfo);
    }
}
