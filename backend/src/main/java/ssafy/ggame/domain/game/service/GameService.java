package ssafy.ggame.domain.game.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.game.dto.GameDetailResDto;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.game.repository.GameRepository;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.recommendation.service.RecommendationService;
import ssafy.ggame.domain.tag.dto.TagDto;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.repository.UserRepository;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final RecommendationService recommendationService;
    private final UserRepository userRepository;

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

    private GameDetailResDto convertToGameDetailResDto(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new BaseException(StatusCode.GAME_NOT_FOUND));

        List<Game> relatedGameList = getPopularGamesByGameId(gameId);

        List<Game> relatedGames = recommendationService.makeGameCardDtoList(relatedGameList);

        return GameDetailResDto.builder()
                .gameId(game.getGameId())
                .gameName(game.getGameName())
                .gameShortDescription(game.getGameShortDescription())
                .gameDetailedDescription(game.getGameDetailedDescription())
                .gameHeaderImg(game.getGameHeaderImg())
                .gameWebsite(game.getGameWebsite())
                .gameDeveloper(game.getGameDeveloper())
                .gamePublisher(game.getGamePublisher())
                .gamePriceInitial(game.getGamePriceInitial())
                .gamePriceFinal(game.getGamePriceFinal())
                .gameDiscountPercent(game.getGameDiscountPercent())
                .gameReleaseDate(game.getGameReleaseDate())
                .screenshotList(game.getGameScreenshotImg())
                .videoUrlList(game.getVideoUrlList())
                .relatedGameList(relatedGames)
                .build();
    }

    private List<Game> getPopularGamesByGameId(Long gameId) {

        Game detailGame = gameRepository.findById(gameId)
                .orElseThrow(() -> new BaseException(StatusCode.GAME_NOT_FOUND));
        List<User> users = userRepository.findAllUsersByGame(detailGame);


        // 사용자가 좋아하는 게임을 counting하기 위한 맵 생성
        Map<Game, Integer> gameCountMap = new HashMap<>();
        // 사용자가 없는 경우 null 반환
        if (users.isEmpty()) {
            return null;
        }

        // 각 사용자의 선호(prefer) 목록에서 좋아하는 게임을 추출하여 counting
        for (User user : users) {
            List<Game> preferredGames = gameRepository.findPreferredGamesByUser(user);
            for (Game game : preferredGames) {
                gameCountMap.put(game, gameCountMap.getOrDefault(game, 0) + 1); // 해당 게임의 count를 증가시킴
            }
        }
        // gameCountMap이 완전히 비어 있는 경우 처리
        if (gameCountMap.isEmpty()) {
            return null;
        }

        // 맵을 카운트를 기준으로 내림차순 정렬하여 게임 ID 리스트 생성
        List<Map.Entry<Game, Integer>> sortedEntries = new ArrayList<>(gameCountMap.entrySet());
        sortedEntries.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        // 정렬된 게임 ID 리스트 생성
        List<Game> sortedGames = new ArrayList<>();
        for (Map.Entry<Game, Integer> entry : sortedEntries) {
            sortedGames.add(entry.getKey());
        }
        return sortedGames;

    }

}
