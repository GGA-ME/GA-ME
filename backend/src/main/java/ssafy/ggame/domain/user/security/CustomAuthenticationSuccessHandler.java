package ssafy.ggame.domain.user.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.*;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.repository.UserRepository;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository; // UserRepository 의존성 주입

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        String email = authentication.getName(); // 로그인 성공한 사용자의 이메일 획득

        // 이메일을 통해 사용자 정보를 데이터베이스에서 조회
        Optional<User> userOptional = userRepository.findByUserEmail(email);

        if (userOptional.isPresent()) {
            // 이미 가입된 회원인 경우
            User user = userOptional.get();
            // 사용자의 마지막 로그인 날짜를 현재 날짜로 업데이트
            user.setUserLastLoginDt(LocalDate.now());
            userRepository.save(user); // 변경사항 저장
            response.sendRedirect("/test");
        } else {
            // 처음 가입하는 유저인 경우
            // 여기서 사용자 정보를 데이터베이스에 등록하는 로직을 추가해야 합니다.
            // 예시:
            User newUser = new User();
            newUser.setUserEmail(email);
            // newUser의 다른 필드 설정...
            newUser.setUserLastLoginDt(LocalDate.now()); // 가입 시점도 마지막 로그인 날짜로 설정
            userRepository.save(newUser);

            response.sendRedirect("/register");
        }
    }
}
