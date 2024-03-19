package ssafy.ggame.domain.recommendation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.recommendation.service.RecommendationService;
import ssafy.ggame.global.common.BaseResponse;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/popular")
    ResponseEntity<BaseResponse<List<GameCardDto>>> getPopularGameList(@RequestParam(required=true, defaultValue = "0") Integer userId
            ,@RequestParam(required =true, defaultValue = "0") String codeId
            , @RequestParam(required = true, defaultValue = "0") Integer tagId){

        List<GameCardDto> resultList = recommendationService.getPopularList(userId, codeId, tagId);

        return ResponseEntity.ok(new BaseResponse<List<GameCardDto>>(resultList));
    }




}
