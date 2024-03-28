package ssafy.ggame.domain.recommendation.dto;

import lombok.*;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.tag.dto.TagDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Builder
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class TempDto implements Comparable<TempDto>{
    private Long gameId;
    private Double gameFinalScore;
    private String gameName;
    private String gameHeaderImg;
    private Integer gamePriceInitial;
    private Integer gamePriceFinal;
    private String gameDeveloper;
    private String codeId;
    private Short tagId;
    private String tagName;

    public GameCardDto converToGameCardDto(){

        return GameCardDto.builder()
                .gameId(this.gameId)
                .gameName(this.gameName)
                .gameHeaderImg(this.getGameHeaderImg())
                .gamePriceInitial(this.gamePriceInitial)
                .gamePriceFinal(this.gamePriceFinal)
                .gameDeveloper(this.gameDeveloper)
                .isPrefer(false)
                .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TempDto tempDto = (TempDto) o;
        return Objects.equals(gameId, tempDto.gameId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(gameId);
    }

    @Override
    public int compareTo(TempDto other) {
        return this.gameId.compareTo(other.gameId);
    }

    //    @Override
//    public boolean equals(Object obj) {
//        if (this == obj) {
//            return true;
//        }
//        if (obj == null || getClass() != obj.getClass()) {
//            return false;
//        }
//        TempDto other = (TempDto) obj;
//        return Objects.equals(gameId, other.gameId)
//                && Objects.equals(gameFinalScore, other.gameFinalScore)
//                && Objects.equals(codeId, other.codeId)
//                && Objects.equals(tagId, other.tagId);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(gameId, gameFinalScore, codeId, tagId);
//    }

}