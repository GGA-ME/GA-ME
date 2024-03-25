package ssafy.ggame.domain.game.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.user.entity.User;

import java.util.List;

public interface GameRepository extends JpaRepository<Game,Long> {
    List<Game> findAllByOrderByGameFinalScore(Pageable pageable);

    List<Game> findAllByGameId(Long gameId);

    List<Game> findFirst10ByOrderByGameFinalRecentScoreDesc();

    // 각 사용자가 선호하는 게임 목록을 가져오는 쿼리 메서드
    @Query("SELECT p.preferId.game FROM Prefer p WHERE p.preferId.user = :user")
    List<Game> findPreferredGamesByUser(@Param("user") User user);

//    @Query("SELECT e FROM game e WHERE e.gCodeId = :codeId AND e.tagId = :tagId ORDER BY e.gameFinalScore")
//    List<Game> findAllByGCodeIdAndTagIdOrderByGameFinalScore(String codeId, Short tagId);

}
