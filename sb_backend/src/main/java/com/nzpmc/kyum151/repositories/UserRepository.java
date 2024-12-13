package com.nzpmc.kyum151.repositories;

import com.nzpmc.kyum151.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findByEmail(String username);
}
