package ssafy.ggame.domain.userTag.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserTagDto {
    private Integer userId;
    private Short tagId;
    private String codeId;
    private String tagName;
    private Short userTagWeight;
}
