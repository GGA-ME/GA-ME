package ssafy.ggame.domain.tag.entity;

import jakarta.persistence.*;
import ssafy.ggame.domain.tag.Code;

@Entity
@IdClass(TagCompositeKey.class)
public class Tag {

    private Short tagId;
    // 다른 필드 및 메소드...

    @Enumerated(value = EnumType.STRING)
    private Code codeId;

    private String tagName;
}