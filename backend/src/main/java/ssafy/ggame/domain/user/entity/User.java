package ssafy.ggame.domain.user.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import lombok.experimental.SuperBuilder;
import ssafy.ggame.domain.prefer.entity.Prefer;
import ssafy.ggame.global.common.BaseCreatedTimeEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
@Table(name= "user")
public class User extends BaseCreatedTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId; //사용자 아이디 (AI)

    @Column(name= "user_email", nullable = false)
    @Email
    private String userEmail;   // 사용자 이메일

    @Column(name= "user_name", nullable = false)
    private String userName;    // 사용자 이름

    @Column(name= "user_birth", nullable = true)
    private short userBirth; // 생년만 받아와서 계산하기

    @Column(name= "user_last_login_dt", nullable = false)
    private LocalDate userLastLoginDt; // 사용자의 마지막 로그인 날짜

    @Column(name= "user_profile_img")
    private String userProfileImg;  // 사용자 프로필 이미지 URL


    @OneToMany(mappedBy = "userId")
    @PrimaryKeyJoinColumn
    List<Prefer> articleFiles = new ArrayList<>();

//    @OneToMany(mappedBy = "userId")
//    @PrimaryKeyJoinColumn
//    List<Like> articleFiles = new ArrayList<>();
}
