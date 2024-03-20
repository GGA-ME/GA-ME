package ssafy.ggame.domain.search.Service;

import ssafy.ggame.domain.game.dto.GameCardDto;

import java.util.List;

public interface SearchService {
    List<GameCardDto> searchLikeGame (String keyword);
}
