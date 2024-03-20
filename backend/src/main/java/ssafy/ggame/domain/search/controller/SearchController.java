package ssafy.ggame.domain.search.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.search.Service.SearchService;
import ssafy.ggame.global.common.BaseResponse;
import ssafy.ggame.global.common.StatusCode;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;
    @GetMapping
    public ResponseEntity<Object> searchLikeGame(@RequestParam String keyword){
        List<GameCardDto> gameCardDtos = searchService.searchLikeGame(keyword);
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(gameCardDtos));
    }
}
