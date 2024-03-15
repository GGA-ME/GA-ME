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
import java.util.Date;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository; // UserRepository 의존성 주입

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        String email = authentication.getName(); // 로그인 성공한 사용자의 이메일 획득

        // 이메일을 통해 사용자 정보를 데이터베이스에서 조회
        User user = userRepository.findByUserEmail(email)
                .orElse(null);

        // 이메일을 통해 사용자가 데이터베이스에 존재하는지 확인
        boolean userExists = userRepository.findByUserEmail(email).isPresent();

        if (userExists) {
            // 이미 가입된 회원인 경우
            // 사용자의 마지막 로그인 날짜를 현재 날짜로 업데이트
            user.setUserLastLoginDt(new Date());
            userRepository.save(user); // 변경사항 저장
            response.sendRedirect("/test");
        } else {
            // 처음 가입하는 유저인 경우
            response.sendRedirect("/register");
        }
    }
}
