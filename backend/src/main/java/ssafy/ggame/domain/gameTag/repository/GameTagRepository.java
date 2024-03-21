package ssafy.ggame.domain.gameTag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.userTag.entity.UserTag;

import java.util.List;

public interface GameTagRepository extends JpaRepository<GameTag, Long> {
    List<GameTag> findByGame_GameId(Long gameId);

    @Query("SELECT gt FROM GameTag gt WHERE gt.tag.tagId.code.codeId = :codeId AND gt.tag.tagId.tagId = :tagId")
    GameTag findByCodeIdAndTagId(String codeId, Short tagId);


    // codeId와 tagId를 가지는 모든 GameTag를 가져옴
    List<GameTag> findAllByTag_TagId_Code_CodeIdAndTag_TagId_TagId(String codeId, Short tagId);

}
