package ssafy.ggame.domain.userTag.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserTagDislikeRequest {
    private Integer userId;
    private List<TagCodePair> tags;

    @Getter
    public static class TagCodePair {
        private String codeId;
        private Short tagId;
    }
}
