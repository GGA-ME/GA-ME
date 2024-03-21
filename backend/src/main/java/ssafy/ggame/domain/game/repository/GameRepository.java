package ssafy.ggame.domain.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ggame.domain.game.entity.Game;

import java.util.List;

public interface GameRepository extends JpaRepository<Game,Long> {
    List<Game> findAllByOrderByGameFinalScore();
//    List<Game> findAllByGCodeIdAndTagIdOrderByGameFinalScore(String codeId, Short tagId);

}
