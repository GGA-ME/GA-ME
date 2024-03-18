package ssafy.ggame.domain.user.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserDto {
    private String userEmail;
    private Short userBirth;
    private String userName;
    private String userProfileImg;
    private LocalDate userLastLoginDt;
    private LocalDateTime createdDttm;
    // Getter, Setter 생략
    // 생성자 생략, ToString 생략


}