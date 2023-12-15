package com.example.bwfchat.services;

import com.example.bwfchat.entity.Message;
import com.example.bwfchat.entity.Profile;
import com.example.bwfchat.entity.Reaction;
import com.example.bwfchat.exceptions.ProfileDontExistException;
import com.example.bwfchat.repository.MessageRepository;
import com.example.bwfchat.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    public long getTotalCount(){
        return messageRepository.count();
    }

    public void processReaction(String userId, String uuid, boolean isDelete,String messageUid) {
        List<Reaction> reactionList = new ArrayList<>();
        Optional<Message> message =  messageRepository.findByUuid(messageUid);
        boolean processed = false;
        message.ifPresentOrElse(value->{
            reactionList.addAll(Reaction.toObject(value.getReaction()));
            reactionList.forEach(reaction -> {
                if (processed) return;
                if (reaction.getUuid().equals(uuid)
                        && isDelete
                        && reaction.getUsers().contains(userId)) {
                    reaction.setCounter(reaction.getCounter()-1);
                } else if (reaction.getUuid().equals(uuid)
                        && !isDelete
                        && !reaction.getReaction().contains(userId)) {
                    reaction.setCounter(reaction.getCounter()+1);
                }
            });
            if (!processed && !isDelete){
                //Reaction reaction = new Reaction(UUID.randomUUID().toString(),)
            }
        },()-> {throw new RuntimeException();});
        Message finalMessage = message.get();
        finalMessage.setReaction(Message.toJsonReaction(reactionList));
    }
}
