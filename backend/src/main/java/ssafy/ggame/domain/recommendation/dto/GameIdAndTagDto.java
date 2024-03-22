package ssafy.ggame.domain.recommendation.dto;

import lombok.Getter;
import ssafy.ggame.domain.tag.dto.TagDto;

import java.util.List;

@Getter
public class GameIdAndTagDto {
    Long gameId;
    List<TagDto> tagList;
}
