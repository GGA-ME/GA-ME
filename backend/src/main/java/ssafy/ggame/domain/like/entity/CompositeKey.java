package ssafy.ggame.domain.like.entity;

import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.user.entity.User;

import java.io.Serializable;

public class CompositeKey implements Serializable {
    private User userId;
    private Game gameId;
}
