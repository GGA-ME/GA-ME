package ssafy.ggame.domain.userTag.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ssafy.ggame.domain.commonCode.entity.CommonCode;
import ssafy.ggame.domain.tag.entity.Tag;
import ssafy.ggame.domain.user.entity.User;

@Entity
@Getter
@Setter
public class UserTag {

    @EmbeddedId
    private UserTagId id;

    @ManyToOne
    @MapsId("userId") // UserTagId 내 userId 필드에 매핑
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("tagId") // UserTagId 내 tagId 필드에 매핑
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @ManyToOne
    @JoinColumn(name = "code_id") // codeId 외래 키
    private CommonCode commonCode;

    @Column(name = "user_tag_weight")
    private Short userTagWeight; // 회원-태그 가중치
}
