package ssafy.ggame.domain.recommendation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.ggame.domain.game.entity.Game;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecommendationRepository extends JpaRepository<Game, Long> {

    List<Game> findAllOrderByGameFinalScore();
}
