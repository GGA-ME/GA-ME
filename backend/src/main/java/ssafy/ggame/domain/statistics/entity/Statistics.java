package ssafy.ggame.domain.statistics.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.ggame.global.common.BaseCreatedTimeEntity;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "statistics")
public class Statistics extends BaseCreatedTimeEntity {
    @EmbeddedId
    private StatisticsId statisticsId;

    @Column(name = "statistics_like_0")
    private Integer statisticsLike0;

    @Column(name = "statistics_like_10")
    private Integer statisticsLike10;
    @Column(name = "statistics_like_20")
    private Integer statisticsLike20;
    @Column(name = "statistics_like_30")
    private Integer statisticsLike30;
    @Column(name = "statistics_like_40")
    private Integer statisticsLike40;
    @Column(name = "statistics_like_50")
    private Integer statisticsLike50;
    @Column(name = "statistics_like_60")
    private Integer statisticsLike60;
    @Column(name = "statistics_like_70")
    private Integer statisticsLike70;
    @Column(name = "statistics_like_80")
    private Integer statisticsLike80;
    @Column(name = "statistics_like_90")
    private Integer statisticsLike90;
    @Column(name = "game_max_playtime")
    private Integer gameMaxPlaytime;
    @Column(name = "statistics_base_dt")
    private Integer statisticsBaseDt;

}
