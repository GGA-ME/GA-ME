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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // UserTag 엔티티의 기본 키

    @ManyToOne
    @JoinColumn(name = "user_id") // userId 외래 키
    private User user;

    @ManyToOne
    @JoinColumn(name = "tag_id") // tagId 외래 키
    private Tag tag;

    @ManyToOne
    @JoinColumn(name = "code_id") // codeId 외래 키
    private CommonCode commonCode;

    @Column(name = "user_tag_weight")
    private Short userTagWeight; // 회원-태그 가중치
}
