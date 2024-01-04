package com.example.bwfchat.events;

import com.example.bwfchat.entity.SystemInfo;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DatabaseChangeServiceSystemInfo {
    private final List<FluxSink<DatabaseChangeEvent>> subscribers = new ArrayList<>();
    private final ApplicationEventPublisher applicationEventPublisher;

    @PostConstruct
    private void init(){
        SystemInfo.setDatabaseChangeService(this);
        SystemInfo.setApplicationEventPublisher(applicationEventPublisher);
    }

    public Flux<DatabaseChangeEvent> databaseChangeStream(){
        return Flux.create(subscriber->{
            subscribers.add(subscriber);
            subscriber.onDispose(()-> subscribers.remove(subscriber));
        });
    }
    public void publishDatabaseChangeEvent(DatabaseChangeEvent event){
        applicationEventPublisher.publishEvent(event);
        for(FluxSink<DatabaseChangeEvent> subscriber: subscribers){
            subscriber.next(event);
        }
    }
}
