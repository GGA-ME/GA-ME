package ssafy.ggame.domain.commonCode.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class CommonCode {
    @Id
    private String codeId;
    // 다른 필드 및 메소드...
}
