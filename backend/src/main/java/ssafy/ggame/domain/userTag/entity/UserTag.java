package ssafy.ggame.domain.userTag.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;

@Entity
@Getter
public class UserTag {

    @EmbeddedId
    private UserTagId userTagId;

    @Column(name = "user_tag_weight")
    private Short userTagWeight; // 회원-태그 가중치
}
