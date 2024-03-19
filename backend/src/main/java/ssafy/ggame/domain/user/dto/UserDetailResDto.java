package ssafy.ggame.domain.user.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Data
public class UserDetailResDto {
    // 회원 아이디
    Integer userId;

    // 회원 이름
    String userName;

    // 회원 프로필 이미지
    String userProfileImg;

    // 회원 만나이 표시
    Integer userAge;

    // 선호게임 출력을 위한 리스트
//    List<GameCardDto> preferList;

    // 선호 태그와 나의 취향 분석 그래프 표시를 위한 리스트
//    List<tagWeight> tagWeightList;
}
