package ssafy.ggame.domain.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import ssafy.ggame.global.common.BaseCreatedTimeEntity;

import java.util.Date;

@Entity
@Getter
@Setter
public class User extends BaseCreatedTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId; //사용자 아이디 (AI)
    private String userEmail;   // 사용자 이메일
    private String userName;    // 사용자 이름
    private String userProfileImg;  // 사용자 프로필 이미지 URL
    private Date userLastLoginDt; // 사용자의 마지막 로그인 날짜

    // 기본 생성자
    public User() {
    }
}
