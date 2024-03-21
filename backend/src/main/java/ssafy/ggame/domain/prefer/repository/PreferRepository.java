package ssafy.ggame.domain.prefer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ggame.domain.game.entity.Game;
import org.springframework.data.jpa.repository.Query;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.prefer.entity.Prefer;
import ssafy.ggame.domain.prefer.entity.PreferId;
import ssafy.ggame.domain.user.entity.User;

import java.util.Optional;

import java.util.List;

public interface PreferRepository extends JpaRepository<Prefer, PreferId> {
    Optional<Prefer> findByPreferIdUserAndPreferIdGame(User user, Game game);

    @Query("SELECT p FROM Prefer p where p.preferId.user.userId = :userId")
    List<Prefer> findByUserId(Integer userId);

}
