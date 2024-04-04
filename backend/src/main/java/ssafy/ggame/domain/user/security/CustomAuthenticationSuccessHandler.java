package ssafy.ggame.domain.user.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ssafy.ggame.domain.user.dto.UserInfoResDto;
import ssafy.ggame.domain.user.service.UserService;
import ssafy.ggame.global.common.BaseResponse;

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        Boolean isNewUser = (Boolean) request.getSession().getAttribute("isNewUser");

        String email = authentication.getName(); // OAuth2 로그인 시 사용되는 이메일

        // UserService를 통해 사용자 상세 정보 조회
        UserInfoResDto userInfo = userService.findByEmail(email)
                .map(user -> {
                    // UserInfoResDto 객체 생성 및 필드 설정
                    UserInfoResDto userInfoResDto = new UserInfoResDto();
                    userInfoResDto.setUserId(user.getUserId());
                    userInfoResDto.setUserName(user.getUserName());
                    userInfoResDto.setUserProfileImg(user.getUserProfileImg());
                    userInfoResDto.setIsNewUser(isNewUser);
                    return userInfoResDto;
                })
                .orElse(null);

        BaseResponse<UserInfoResDto> responseDto = new BaseResponse<>(userInfo); // 성공 응답 객체 생성

        // 응답 본문에 UserInfoResDto 정보를 JSON 형태로 설정
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(responseDto));
    }
}

