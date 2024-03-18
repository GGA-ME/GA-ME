package ssafy.ggame.domain.tag.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Tag {
    @Id
    private Short tagId;
    // 다른 필드 및 메소드...
}