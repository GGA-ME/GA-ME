package ssafy.ggame.domain.prefer.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static ssafy.ggame.domain.game.entity.QGame.game;
import static ssafy.ggame.domain.prefer.entity.QPrefer.prefer;

@Repository
@RequiredArgsConstructor
public class PreferCustomRepositoryImpl implements PreferCustomRepository{
    private final JPAQueryFactory queryFactory;
    //선호 게임 이름 가져오기
    @Override
    public List<String> findPreferGameNames(Integer userId) {
        return queryFactory.select(
                            game.gameName
                            )
                .from(prefer)
                .join(prefer.preferId.game, game)
                .where(prefer.preferId.user.userId.eq(userId))
                .fetch();
    }
}
