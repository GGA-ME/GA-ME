package ssafy.ggame.domain.gameChoice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameChoice {
    @Id
    @Column(name = "game_id")
    private Long gameId;

    @Column(name = "game_choice_name")
    private String gameChoiceName;

    @Column(name = "game_header_img")
    private String gameHeaderImg;
}
