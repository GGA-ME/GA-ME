package ssafy.ggame.domain.game.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.game.entity.Game;

import java.util.List;

import static ssafy.ggame.domain.game.entity.QGame.game;


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
    public List<GameCardDto> findByGameNameContaining(String keyword) {
        List<Game> searchGames = queryFactory.select(
                        game
                ).from(game)
                .where(game.gameName.containsIgnoreCase(keyword))
                .orderBy(game.gameFinalScore.desc())
                .fetch();
        return searchGames.stream().map(Game::converToGameCardDto).toList();
    }
}
