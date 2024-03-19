package ssafy.ggame.domain.tag.entity;


import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.ggame.domain.tag.Code;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
public class TagCompositeKey {

    private Short tagId;

    @Enumerated(value = EnumType.STRING)
    private Code codeId;
}
