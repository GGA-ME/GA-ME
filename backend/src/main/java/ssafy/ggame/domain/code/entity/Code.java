package ssafy.ggame.domain.code.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Code {
    @Id
    @Column(name = "code_id")
    private String codeId;
    @Column(name = "code_name")
    private String codeName;
}
