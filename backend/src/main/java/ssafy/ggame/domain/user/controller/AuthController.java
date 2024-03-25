package ssafy.ggame.domain.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.user.dto.UserInfoResDto;
import ssafy.ggame.domain.user.service.AuthService;
import ssafy.ggame.global.common.BaseResponse;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/google/callback")
    public ResponseEntity<BaseResponse<UserInfoResDto>> handleGoogleCallback(@RequestBody Map<String, String> payload) {
        // 클라이언트로부터 받은 인증 코드를 추출합니다.
        String code = payload.get("code");

        // AuthService를 사용하여 사용자 정보를 조회합니다.
        UserInfoResDto userInfo = authService.getUserInfo(code);

        // 조회한 사용자 정보를 클라이언트에 반환합니다.
        return ResponseEntity.ok(new BaseResponse<>(userInfo));
    }
}
