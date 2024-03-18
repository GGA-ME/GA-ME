package ssafy.ggame.domain.gameTag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ggame.domain.gameTag.entity.GameTag;

import java.util.List;

public interface GameTagRepository extends JpaRepository<GameTag, Long> {

    List<GameTag> findByGameId(Long gameId);
}