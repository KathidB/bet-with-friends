package com.example.bwfchat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    private long id;
    @Column(name = "public_id")
    private String uuid;
    private String name;
    private long points;
    private String avatar;
    @Column(name = "ranking_id")
    private long ranking;
    @Column(name="rating_id")
    private long rating;
    @Column(name="user_id")
    private long user;
}
