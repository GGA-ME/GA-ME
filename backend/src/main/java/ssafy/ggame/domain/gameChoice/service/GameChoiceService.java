package ssafy.ggame.domain.gameChoice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.game.repository.GameRepository;
import ssafy.ggame.domain.gameChoice.entity.GameChoice;
import ssafy.ggame.domain.gameChoice.repository.GameChoiceRepository;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameChoiceService {
    private final GameChoiceRepository gameChoiceRepository;
    private final GameRepository gameRepository;

    public List<GameChoice> getGameList(){
        return this.gameChoiceRepository.findAll();
    }

    public boolean saveChoiceGame(Long gameId){
        Game game = this.gameRepository.findById(gameId).orElseThrow(() -> new BaseException(StatusCode.GAME_NOT_FOUND));
        GameChoice gameChoice = GameChoice.builder()
                .gameId(game.getGameId())
                .gameChoiceName(game.getGameName())
                .gameHeaderImg(game.getGameHeaderImg())
                .build();
        this.gameChoiceRepository.save(gameChoice);
        return true;
    }
}
