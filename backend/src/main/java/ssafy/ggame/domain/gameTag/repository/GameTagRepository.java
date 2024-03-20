package ssafy.ggame.domain.gameTag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.gameTag.entity.GameTag;

import java.util.List;

public interface GameTagRepository extends JpaRepository<GameTag, Long> {
    List<GameTag> findByGame_GameId(Long gameId);


    @Query("SELECT game g FROM GameTag gt WHERE gt.tag.tagId.code.codeId = :codeId AND gt.tag.tagId.tagId = :tagId order by g.gameFinalScore")
    List<Game> findAllByCodeIdAndTagId(String codeId, Short tagId);
}
