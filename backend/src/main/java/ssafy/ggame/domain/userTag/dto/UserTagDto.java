package ssafy.ggame.domain.userTag.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserTagDto {
    private Integer userId;
    private Short tagId;
    private String codeId;
    private Short userTagWeight;
}
