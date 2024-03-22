package ssafy.ggame.domain.recommendation.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class SearchGameRequestDto {

    Integer userId;
    List<GameIdAndTagDto> gameIdAndTagDtoList;
}
