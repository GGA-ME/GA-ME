package ssafy.ggame.domain.gameTag.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ssafy.ggame.domain.commonCode.entity.CommonCode;
import ssafy.ggame.domain.recommendation.entity.Game;
import ssafy.ggame.domain.tag.entity.Tag;

@Entity
@Getter
@Setter
public class GameTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // UserTag 엔티티의 기본 키

    @ManyToOne
    @JoinColumn(name = "game_id") // gameId 외래 키
    private Game gameId;        // 게임 아이디(pk)

    @ManyToOne
    @JoinColumn(name = "tag_id") // tagId 외래 키
    private Tag tag;

    @ManyToOne
    @JoinColumn(name = "code_id") // codeId 외래 키
    private CommonCode commonCode;
}
