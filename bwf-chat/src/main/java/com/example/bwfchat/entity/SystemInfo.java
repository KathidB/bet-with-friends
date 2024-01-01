package com.example.bwfchat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "system_info",schema = "msgs")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
}
