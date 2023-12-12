package com.example.bwfchat.repository;

import com.example.bwfchat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Long> {

    @Query(nativeQuery = true, value = "SELECT * from msgs.messages ORDER BY msgs.messages.id OFFSET :page limit :limit")
    List<Message> findAll(@Param("page") int page,@Param("limit") int limit);

}
