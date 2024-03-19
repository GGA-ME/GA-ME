package ssafy.ggame.domain.game.entity;

import jakarta.persistence.*;

import lombok.*;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.prefer.entity.Prefer;
import ssafy.ggame.global.common.BaseUpdatedEntity;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "game")
public class Game extends BaseUpdatedEntity {
    @Id
    private Long gameId;

    @Column(name = "game_name", nullable = false)
    private String gameName;

    @Column(name = "game_short_description")
    private String gameShortDescription;

    @Column(name = "game_detailed_description")
    private String gameDetailedDescription;

    @Column(name = "game_header_img")
    private String gameHeaderImg;

    @Column(name = "game_website")
    private String gameWebsite;

    @Column(name = "game_developer", nullable = false)
    private String gameDeveloper;

    @Column(name = "game_publisher", nullable = false)
    private String gamePublisher;

    @Column(name = "game_price_initial")
    private Integer gamePriceInitial;

    @Column(name = "game_price_final")
    private Integer gamePriceFinal;

    @Column(name = "game_discount_percent")
    private Byte gameDiscountPercent;

    @Column(name = "game_release_date")
    private String gameReleaseDate;

    @Column(name = "game_screenshot_img")
    private String gameScreenshotImg;

    @Column(name = "game_final_score")
    private Byte gameFinalScore;

    @Column(name = "game_word_cloud_url")
    private String gameWordCloudUrl;

    @OneToMany(mappedBy = "game")
    private List<GameTag> gameTags;

    public GameCardDto converToGameCardDto(){
        return GameCardDto.builder()
                .gameId(this.gameId)
                .gameName(this.gameName)
                .gameHeaderImg(this.getGameHeaderImg())
                .gamePriceInitial(this.gamePriceInitial)
                .gamePriceFinal(this.gamePriceFinal)
                .gameDeveloper(this.gameDeveloper)
                .build();
    }
}
