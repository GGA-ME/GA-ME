package ssafy.ggame.domain.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.ggame.domain.tag.Code;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TagDto {
    Code codeId;
    Short tagId;
    String tagName;
}
