package ssafy.ggame.domain.tag.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tag {
    @EmbeddedId
    private TagId tagId;
    @Column(name = "tag_name")
    private String tagName;

//    public TagDto convertToTagDto(){
//        return TagDto.builder()
//                .codeId(this.codeId)
//                .tagId(this.tagId)
//                .tagName(this.tagName)
//                .build();
//    }
}