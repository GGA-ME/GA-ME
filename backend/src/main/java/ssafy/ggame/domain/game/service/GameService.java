package ssafy.ggame.domain.game.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.game.repository.GameRepository;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.tag.dto.TagDto;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    /**
     *
     * @param gameId
     * @return List<GameCardDto>
     *     - gameId
     *     - gagList
     */
    public List<GameCardDto> getGameIdAndTagList(Long gameId){

        List<GameCardDto> gameCardDtoList = new ArrayList<>();

        List<Game> gameList = gameRepository.findAllByGameId(gameId);

        for(Game game : gameList){
            // 한 게임의 태그 리스트를 dto로 변환한 태그리스트 생성
            List<TagDto> tagList = new ArrayList<>();
            for(GameTag gameTag : game.getGameTags()){
                tagList.add(gameTag.convertToTagDto());
            }
            //gameId, tagList만 있는 GameCardDto 생성
            GameCardDto gameCardDto = GameCardDto.builder()
                    .gameId(game.getGameId())
                    .build();
            gameCardDto.updateTagList(tagList);
            // 리스트에 넣기
            gameCardDtoList.add(gameCardDto);
        }

        return gameCardDtoList;



    }
}
