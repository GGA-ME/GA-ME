package ssafy.ggame.domain.like.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.user.entity.User;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CompositeKey implements Serializable {
    private User userId;
    private Game gameId;
}
