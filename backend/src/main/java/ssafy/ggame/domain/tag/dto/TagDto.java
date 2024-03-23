package ssafy.ggame.domain.tag.dto;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TagDto {
    String codeId;
    Short tagId;
    String tagName;
}
