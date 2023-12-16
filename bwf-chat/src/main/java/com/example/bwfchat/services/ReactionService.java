package com.example.bwfchat.services;

import com.example.bwfchat.entity.Reaction;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReactionService {
    @Value("${be.url.image}")
    private final String REACTION_URL;

    public ReactionService(@Value("${be.url.image}") String REACTION_URL){
        this.REACTION_URL = REACTION_URL;
        reactionList = new ArrayList<>(List.of(
                new Reaction("1",REACTION_URL+"like",new ArrayList<String>(),0l)
        ));
    }
    private List<Reaction> reactionList;

    public List<Reaction> reactionList(){
        return reactionList;
    }
}
