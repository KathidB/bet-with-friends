package com.example.bwfchat.controller;

import com.example.bwfchat.entity.Response;
import com.example.bwfchat.entity.SystemInfo;
import com.example.bwfchat.mediator.SystemInfoMediator;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/system_info")
@RequiredArgsConstructor
public class SystemInfoController {

    private final SystemInfoMediator systemInfoMediator;


    @PostMapping()
    public ResponseEntity<Response> sendSystemInfo(@RequestBody SystemInfo systemInfo, HttpServletRequest request){
        String token = request.getHeader("APP-TOKEN");
        systemInfoMediator.send(systemInfo,token);
        return ResponseEntity.ok(new Response("Message has been send","OK"));
    }
}
