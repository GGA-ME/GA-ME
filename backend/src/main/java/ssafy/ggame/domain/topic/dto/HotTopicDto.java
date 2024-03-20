package ssafy.ggame.domain.topic.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class HotTopicDto {
    private String hotTopicLink;
    private String hotTopicImg;
    private String hotTopicTitle;
    private String hotTopicShortDesc;
}
