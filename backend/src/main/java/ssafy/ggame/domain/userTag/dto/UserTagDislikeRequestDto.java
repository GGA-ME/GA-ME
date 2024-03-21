package ssafy.ggame.domain.userTag.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserTagDislikeRequestDto {
    private Integer userId;
    private String page;
    private List<TagCodePair> tags;

    @Getter
    public static class TagCodePair {
        private String codeId;
        private Short tagId;
    }
}
