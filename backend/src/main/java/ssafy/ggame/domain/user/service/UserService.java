package ssafy.ggame.domain.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.user.dto.UserDetailResDto;
import ssafy.ggame.domain.user.dto.UserDto;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.repository.UserRepository;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 사용자 ID로 사용자 찾기
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    // 이메일로 사용자 찾기
    public Optional<User> findByEmail(String email) {
        return userRepository.findByUserEmail(email);
    }

    // 사용자 저장 또는 업데이트
    // 로그인과 회원가입 모두 처리?
    public User saveOrUpdateUser(UserDto userDto) {
        User user = User.builder()
                .userBirth(userDto.getUserBirth())
                .userName(userDto.getUserName())
                .userEmail(userDto.getUserEmail())
                .userLastLoginDt(userDto.getUserLastLoginDt())
                .build();

        if(findById(user.getUserId()).isPresent()) user.setUserLastLoginDt(LocalDate.now());
        return userRepository.save(user);
    }

    // 사용자 삭제
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    // 마이 페이지
    public UserDetailResDto userDetail(Integer userId){
        User user = userRepository.findById(userId).orElseThrow(()->new BaseException(StatusCode.USER_NOT_FOUND));

        // 지금 년도
        int year = LocalDate.now().getYear();

        UserDetailResDto userDetailResDto = UserDetailResDto.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userProfileImg(user.getUserProfileImg())
                .userAge(year - user.getUserBirth())
                .build();

        return userDetailResDto;
    }
}

