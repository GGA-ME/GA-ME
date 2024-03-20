package ssafy.ggame.domain.userTag.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.userTag.entity.UserTag;
import ssafy.ggame.domain.userTag.service.UserTagService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tracking")
public class UserTagController {
    @Autowired
    private UserTagService userTagService;

    // 게임에 대한 사용자 패턴 기반 가중치 업데이트
    @PutMapping()
    public ResponseEntity<Object> updateUserTagWeight(@RequestParam("userId") Integer userId,
                                                      @RequestParam("gameId") Long gameId,
                                                      @RequestParam("action") String action) {
        userTagService.updateUserTagWeight(userId, gameId, action);
        return ResponseEntity.ok().build(); // 성공적으로 처리되었음을 응답
    }

    //관심없음 URL 따로 추가
    //@GetMapping("")
}
