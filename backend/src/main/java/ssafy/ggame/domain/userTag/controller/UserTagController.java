package ssafy.ggame.domain.userTag.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.ggame.domain.recommendation.entity.Game;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.gameTag.repository.GameTagRepository;
import ssafy.ggame.domain.userTag.entity.UserTag;
import ssafy.ggame.domain.userTag.service.UserTagService;

import java.util.List;

@RestController
@RequestMapping("/api/tracking?")
public class UserTagController {

    @Autowired
    private UserTagService userTagService;
    private GameTagRepository gameTagRepository;

    @GetMapping("/userId={userId}&gameId={gameId}&action={action}")
    public ResponseEntity<UserTag> updateWeight(@PathVariable Integer userId, @PathVariable Long gameId, @PathVariable String action) {
        // gameId에 해당하는 모든 태그 조회
        Game game = new Game(); // 이 부분은 실제 게임 엔티티 조회 로직으로 대체해야 합니다.
        game.setGameId(gameId);

        List<GameTag> gameTags = gameTagRepository.findByGameId(gameId);

        // 조회된 모든 태그에 대해 가중치 업데이트
        for (GameTag gameTag : gameTags) {
            userTagService.updateWeightByAction(userId, gameTag.getId(), action);
        }

        return ResponseEntity.ok().build();
    }

    //관심없음 URL 따로 추가
    //@GetMapping("")

}
