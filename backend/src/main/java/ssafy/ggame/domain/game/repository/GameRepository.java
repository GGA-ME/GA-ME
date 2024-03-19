package ssafy.ggame.domain.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ggame.domain.game.entity.Game;

public interface GameRepository extends JpaRepository<Game,Integer> {
}
