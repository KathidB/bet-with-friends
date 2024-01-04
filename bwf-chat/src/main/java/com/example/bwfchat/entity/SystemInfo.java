package com.example.bwfchat.entity;

import com.example.bwfchat.events.DatabaseChangeEvent;
import com.example.bwfchat.events.DatabaseChangeService;
import com.example.bwfchat.events.DatabaseChangeServiceSystemInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name = "system_info",schema = "msgs")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class SystemInfo {
    @Id
    @GeneratedValue(generator = "messages_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "messages_id_seq",sequenceName = "messages_id_seq",allocationSize = 1,schema = "msgs")
    private long id;
    private String uuid;
    @Column(name = "profile_id")
    private long profileId;
    @Column(name="message_value")
    private String message;
    @Column(name="was_read")
    private boolean status;



    @Transient
    private static ApplicationEventPublisher applicationEventPublisher;
    @Transient
    private static DatabaseChangeServiceSystemInfo databaseChangeService;

    public static void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        SystemInfo.applicationEventPublisher = applicationEventPublisher;
    }

    public static void setDatabaseChangeService(DatabaseChangeServiceSystemInfo databaseChangeService) {
        SystemInfo.databaseChangeService = databaseChangeService;
    }

    @PostPersist
    private void onDatabaseChange(){
        DatabaseChangeEvent event = new DatabaseChangeEvent(this);
        applicationEventPublisher.publishEvent(event);
        databaseChangeService.publishDatabaseChangeEvent(event);
    }
}
