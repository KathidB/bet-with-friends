package com.example.bwfchat.services;

import com.example.bwfchat.entity.Message;
import com.example.bwfchat.entity.Profile;
import com.example.bwfchat.exceptions.ProfileDontExistException;
import com.example.bwfchat.repository.MessageRepository;
import com.example.bwfchat.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ProfileRepository profileRepository;

    public void sendMessage(String message,String user){
        profileRepository.findProfileByUser(user).ifPresentOrElse(value->{
            Message msg = new Message();
            msg.setContent(message);
            msg.setSender(value);
            msg.setUuid(UUID.randomUUID().toString());
            messageRepository.save(msg);
        }, ()->{throw new ProfileDontExistException("Profile dont exist");});

    }


    public List<Message> getMessage(int page, int limit) {
       return messageRepository.findAll(page,limit);
    }
}
