package ssafy.ggame.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Integer userId;
    private String userEmail;
    private String userName;
    private String userProfileImg;
    // Getter, Setter 생략
}