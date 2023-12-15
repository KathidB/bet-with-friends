package com.example.bwfchat.entity;

import com.google.gson.Gson;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.ApplicationEventPublisher;
import com.example.bwfchat.events.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "messages",schema = "msgs")
@EntityListeners(AuditingEntityListener.class)
public class Message {
    @Id
    @GeneratedValue(generator = "messages_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "messages_id_seq",sequenceName = "messages_id_seq",allocationSize = 1,schema = "msgs")
    private long id;
    private String uuid;
    @ManyToOne
    @JoinColumn(name = "sender")
    private Profile sender;
    private String reaction;
    @Column(name="content_message")
    private String content;



    @Transient
    private static ApplicationEventPublisher applicationEventPublisher;
    @Transient
    private static DatabaseChangeService databaseChangeService;

    public static void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        Message.applicationEventPublisher = applicationEventPublisher;
    }

    public static void setDatabaseChangeService(DatabaseChangeService databaseChangeService) {
        Message.databaseChangeService = databaseChangeService;
    }

    @PostPersist
    private void onDatabaseChange(){
        DatabaseChangeEvent event = new DatabaseChangeEvent(this);
        applicationEventPublisher.publishEvent(event);
        databaseChangeService.publishDatabaseChangeEvent(event);
    }

    public static String toJsonReaction(List<Reaction> reactionList){
        Gson gson = new Gson();
        return gson.toJson(reactionList);
    }
}
