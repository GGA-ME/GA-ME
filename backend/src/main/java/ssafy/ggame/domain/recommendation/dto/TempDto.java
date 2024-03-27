package ssafy.ggame.domain.recommendation.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@ToString
public class TempDto {
    private Long gameId;
    private Double gameFinalScore;
    private String codeId;
    private Short tagId;

    // 생성자, getter, setter 등 필요한 코드 작성

    @Builder //QueryDsl에서 Constructor 사용때문에 추가
    public TempDto (Long gameId, Double gameFinalScore, String codeId, Short tagId ){
        this.gameId = gameId;
        this.gameFinalScore = gameFinalScore;
        this.codeId = codeId;
        this.tagId = tagId;
    }
}