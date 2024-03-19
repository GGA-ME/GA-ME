package ssafy.ggame.domain.user.repository;

import ssafy.ggame.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserEmail(String email);
//    User findByUserAndPrefersUserId(Integer userId, Integer preferId);
}
