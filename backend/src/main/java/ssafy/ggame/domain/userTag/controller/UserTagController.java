package ssafy.ggame.domain.userTag.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.userTag.entity.UserTag;
import ssafy.ggame.domain.userTag.service.UserTagService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tracking?")
public class UserTagController {
    /*@Autowired
    private UserTagService userTagService;

    @GetMapping("/userId={userId}&gameId={gameId}&action={action}")
    public ResponseEntity<UserTag> updateWeight(@RequestParam Integer userId, @RequestParam Long gameId, @RequestParam String action) {
        // UserTagService의 메서드 호출
        userTagService.updateWeightByAction(userId, gameId, action);
        return ResponseEntity.ok().build(); // 성공적으로 처리되었음을 응답
    }*/

    //관심없음 URL 따로 추가
    //@GetMapping("")
}
