package ssafy.ggame.domain.tag.entity;

import jakarta.persistence.*;
import lombok.Getter;
import ssafy.ggame.domain.tag.Code;
import ssafy.ggame.domain.tag.dto.TagDto;

@Entity
@Getter
@IdClass(TagCompositeKey.class)
public class Tag {

    private Short tagId;
    // 다른 필드 및 메소드...

    @Enumerated(value = EnumType.STRING)
    private Code codeId;

    private String tagName;

//    public TagDto convertToTagDto(){
//        return TagDto.builder()
//                .codeId(this.codeId)
//                .tagId(this.tagId)
//                .tagName(this.tagName)
//                .build();
//    }
}