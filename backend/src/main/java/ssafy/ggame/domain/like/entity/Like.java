package ssafy.ggame.domain.like.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import ssafy.ggame.domain.recommendation.entity.Game;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.global.common.BaseCreatedTimeEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@IdClass(CompositeKey.class)
@Table(name = "like")
public class Like extends BaseCreatedTimeEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "game_id", referencedColumnName = "game_id")
    private Game gameId;
}
