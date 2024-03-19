package ssafy.ggame.domain.game.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.ggame.domain.prefer.entity.Prefer;

import java.time.LocalDate;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "game")
public class Game {
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

    /*
    * TemporalType.DATE(TIME, TIMESTAMP): 이 옵션은 시간을 무시하고 날짜만을 저장합니다.
    * 시간은 항상 자정(00:00:00)으로 설정됩니다.*/
    @Column(name = "updated_dt")
    @Temporal(TemporalType.DATE)
    private LocalDate updatedDt;

    @OneToMany(mappedBy = "preferId.game")
    private List<Prefer> prefers;


    /*

    @OneToMany(mappedBy = "game")
    private List<Review> reviews;

    @OneToMany(mappedBy = "game")
    private List<GameScoreInfo> gameScoreInfos;

    @OneToMany(mappedBy = "game")
    private List<Statistics> statistics;
    */

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
