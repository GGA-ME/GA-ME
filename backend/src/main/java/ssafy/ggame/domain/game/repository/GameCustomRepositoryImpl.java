package ssafy.ggame.domain.game.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.search.dto.SearchLikeRequestDto;

import java.util.List;
import java.util.stream.Collectors;

import static ssafy.ggame.domain.game.entity.QGame.game;
import static ssafy.ggame.domain.gameTag.entity.QGameTag.gameTag;
import static ssafy.ggame.domain.prefer.entity.QPrefer.prefer;
import static ssafy.ggame.domain.tag.entity.QTag.tag;


@Repository
@RequiredArgsConstructor
public class GameCustomRepositoryImpl implements GameCustomRepository{

    private final JPAQueryFactory queryFactory;
    /*
        1. 대소문자 구분 X 검색
        2. finalScore 기준 내림차순
        3. 결과 Dto로 다 변환해서 return
     */
    @Override
    public List<GameCardDto> findByGameNameContaining(SearchLikeRequestDto dto) {
        //엔티티로 추출
        List<GameCardDto> searchGames = queryFactory.select(
                        Projections.constructor(
                                GameCardDto.class,
                                game.gameId.as("gameId"),
                                game.gameName.as("gameName"),
                                game.gameHeaderImg.as("gameHeaderImg"),
                                game.gamePriceInitial.as("gamePriceInitial"),
                                game.gamePriceFinal.as("gamePriceFinal"),
                                game.gameDeveloper.as("gameDeveloper")
                        )
                ).from(game)
                .where(game.gameName.containsIgnoreCase(dto.getKeyword()))
                .orderBy(game.gameFinalScore.desc())
                .fetch();

        //해당하는 게임들 id를 추출
        List<Long> ids = searchGames.stream()
                .map(GameCardDto::getGameId) // Game 객체에서 id를 추출
                .toList();
        //prefer 가져오기
        List<Long> preferIds = queryFactory.select(
                        prefer.preferId.game.gameId
                ).from(prefer)
                .where(prefer.preferId.game.gameId.in(ids).and(prefer.preferId.user.userId.eq(dto.getUserId())))
                .fetch();
        //prefer에 해당하는 애들만 true로 설정 하기
        searchGames.forEach(game -> game.updateIsPrefer(preferIds.contains(game.getGameId())));
        //해당하는 게임들 태그 가져오기
        List<Tuple> fetch = queryFactory.select(
                        game.gameId,
                        tag.tagName
                ).from(gameTag)
                .join(gameTag.game, game)
                .join(gameTag.tag, tag)
                .where(gameTag.game.gameId.in(ids)).distinct().fetch();

        return searchGames;
    }
}
