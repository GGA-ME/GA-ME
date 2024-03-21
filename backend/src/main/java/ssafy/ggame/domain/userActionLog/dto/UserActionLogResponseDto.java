package ssafy.ggame.domain.userActionLog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data // Lombok이 getter, setter, toString 등을 자동으로 생성
@NoArgsConstructor
@AllArgsConstructor
public class UserActionLogResponseDto {
    private Integer userId;
    private LocalDateTime actionTime;
    private String pageName;
    private String actionType;
    private List<String> actionParams; // JSON 문자열로 저장된 파라미터
}
