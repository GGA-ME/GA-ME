package ssafy.ggame.domain.userTag.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@ToString
public class UserTag {

    @EmbeddedId
    private UserTagId userTagId;

    @Column(name = "user_tag_weight")
    private Short userTagWeight; // 회원-태그 가중치

    // userTagWeight 필드에 대한 setter 메서드
    public void setUserTagWeight(Short userTagWeight) {
        this.userTagWeight = userTagWeight;
    }
}
