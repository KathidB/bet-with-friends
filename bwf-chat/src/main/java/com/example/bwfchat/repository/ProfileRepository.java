package com.example.bwfchat.repository;

import com.example.bwfchat.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile,Long> {

    @Query(nativeQuery = true, value = "SELECT profiles.* FROM profiles JOIN users ON profiles.user_id = users.id WHERE users.public_id = :user")
    Optional<Profile> findProfileByUser(@Param("user") String user);
}
