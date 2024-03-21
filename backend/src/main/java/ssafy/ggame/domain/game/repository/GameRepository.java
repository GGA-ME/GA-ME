package ssafy.ggame.domain.game.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.ggame.domain.game.entity.Game;

import java.util.List;

public interface GameRepository extends JpaRepository<Game,Long> {
    List<Game> findAllByOrderByGameFinalScore(Pageable pageable);

    List<Game> findAllByGameId(Long gameId);

//    @Query("SELECT e FROM game e WHERE e.gCodeId = :codeId AND e.tagId = :tagId ORDER BY e.gameFinalScore")
//    List<Game> findAllByGCodeIdAndTagIdOrderByGameFinalScore(String codeId, Short tagId);
}
