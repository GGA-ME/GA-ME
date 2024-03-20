package ssafy.ggame.domain.game.repository;

import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.game.entity.Game;

import java.util.List;

public interface GameCustomRepository {
    // 게임명 검색 메소드
    List<GameCardDto> findByGameNameContaining(String keyword);
}
