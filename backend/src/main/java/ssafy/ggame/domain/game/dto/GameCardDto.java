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

    public void updateIsPrefer(boolean isPrefer){
        this.isPrefer = isPrefer;
    }

    public void updateTagList(List<TagDto> tagList){
        this.tagList = tagList;
    }
    @Builder //QueryDsl에서 Constructor 사용때문에 추가
    public GameCardDto(Long gameId, String gameName, String gameHeaderImg, Integer gamePriceInitial, Integer gamePriceFinal, String gameDeveloper) {
        this.gameId = gameId;
        this.gameName = gameName;
        this.gameHeaderImg = gameHeaderImg;
        this.gamePriceInitial = gamePriceInitial;
        this.gamePriceFinal = gamePriceFinal;
        this.gameDeveloper = gameDeveloper;
    }
}
