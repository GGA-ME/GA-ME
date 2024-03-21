package ssafy.ggame.domain.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameStatisticsResDto {
    private String gameWordCloudUrl;
    private StatisticsDto statisticsDto;


}
