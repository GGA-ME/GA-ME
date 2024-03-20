package ssafy.ggame.domain.userTag.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.userTag.dto.UserTagDislikeRequestDto;
import ssafy.ggame.domain.userTag.service.UserTagService;
import ssafy.ggame.global.common.BaseResponse;
import ssafy.ggame.global.common.StatusCode;

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
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.SUCCESS));
        // 성공적으로 처리되었음을 응답
    }

    // 관심 없음 행동 대상 태그 가중치 업데이트
    @PutMapping("/dislike")
    public ResponseEntity<?> updateUserTagWeight(@RequestBody UserTagDislikeRequestDto request) {
        userTagService.dislikeUserTagWeight(request.getUserId(), request.getTags());
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.SUCCESS));
        // 성공적으로 처리되었음을 응답
    }
}
