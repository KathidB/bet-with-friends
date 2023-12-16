package com.example.bwfchat.services;

import com.example.bwfchat.entity.Message;
import com.example.bwfchat.entity.Reaction;
import com.example.bwfchat.exceptions.ProfileDontExistException;
import com.example.bwfchat.repository.MessageRepository;
import com.example.bwfchat.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ProfileRepository profileRepository;
    private final ReactionService reactionService;

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
        AtomicBoolean processed = new AtomicBoolean(false);
        message.ifPresentOrElse(value->{
            if (value.getReaction() != null){
                reactionList.addAll(Reaction.toObject(value.getReaction()));
            }
            reactionList.forEach(reaction -> {
                if (processed.get()) return;
                if (reaction.getUuid().equals(uuid)
                        && isDelete
                        && reaction.getUsers().contains(userId)) {
                    reaction.getUsers().removeIf(user-> user.equals(userId));
                    reaction.setCounter(reaction.getCounter()-1);
                    processed.set(true);
                } else if (reaction.getUuid().equals(uuid)
                        && !isDelete) {
                    if (!reaction.getUsers().contains(userId)){
                        reaction.getUsers().add(uuid);
                        reaction.setCounter(reaction.getCounter()+1);
                    }
                    processed.set(true);
                }
            });
            if (!processed.get() && !isDelete){
                reactionService.reactionList().forEach(reaction -> {
                   if (reaction.getUuid().equals(uuid)){
                       reactionList.add(new Reaction(reaction.getUuid(),reaction.getReaction(),new ArrayList<String>(List.of(userId)),1l));
                   }
               });
            }
            reactionList.removeIf(reaction -> reaction.getCounter() <= 0l);
            value.setReaction(Message.toJsonReaction(reactionList));
            messageRepository.save(value);
        },()-> {throw new RuntimeException();});
        Message finalMessage = message.get();
        finalMessage.setReaction(Message.toJsonReaction(reactionList));
    }
}
