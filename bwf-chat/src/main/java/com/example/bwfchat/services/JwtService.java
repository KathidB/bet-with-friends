package com.example.bwfchat.services;

import com.example.bwfchat.entity.Response;
import com.example.bwfchat.exceptions.UserNotLoggedInException;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class JwtService {

    public String validToken(String auth,String refresh){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cookie","Authorization="+auth+";Refresh="+refresh);
        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        ResponseEntity<Response> response = restTemplate.exchange("http://4.184.219.209:5000/api/v1/auto-login", HttpMethod.GET, entity, Response.class);
        if(response.getStatusCode().is2xxSuccessful()){
            return response.getBody().getMessage();
        } else if (response.getStatusCode().is4xxClientError()) {
            throw  new UserNotLoggedInException("User is not logged in");
        }
        throw new RuntimeException();
    }

}
