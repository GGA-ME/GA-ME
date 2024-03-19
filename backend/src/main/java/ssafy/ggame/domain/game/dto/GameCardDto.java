package ssafy.ggame.domain.game.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.ggame.domain.tag.dto.TagDto;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GameCardDto {
    Long gameId;
    String gameName;
    String gameHeaderImg;
    Integer gamePriceInitial;
    Integer gamePriceFinal;
    String gameDeveloper;
    Boolean isPrefer;
    List<TagDto> tagList;

}
