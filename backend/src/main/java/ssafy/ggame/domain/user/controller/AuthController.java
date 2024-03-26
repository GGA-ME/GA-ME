package ssafy.ggame.domain.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import ssafy.ggame.domain.user.dto.UserInfoResDto;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.repository.UserRepository;
import ssafy.ggame.domain.user.service.AuthService;
import ssafy.ggame.global.common.BaseResponse;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/google/callback")
    public ResponseEntity<BaseResponse<UserInfoResDto>> handleGoogleCallback(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("code", code);
        map.add("redirect_uri", redirectUri);
        map.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity("https://oauth2.googleapis.com/token", request , Map.class);
        Map<String, Object> tokenResponse = response.getBody();
        String accessToken = (String) tokenResponse.get("access_token");

        // 액세스 토큰을 사용하여 사용자 정보를 조회합니다.
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
        HttpEntity<?> userInfoRequest = new HttpEntity<>(userInfoHeaders);
        ResponseEntity<Map> userInfoResponse = restTemplate.exchange("https://www.googleapis.com/oauth2/v2/userinfo", HttpMethod.GET, userInfoRequest, Map.class);
        Map<String, Object> userInfo = userInfoResponse.getBody();
        String email = (String) userInfo.get("email");

        boolean isNewUser = false;
        User user = userRepository.findByUserEmail(email).orElse(null);
        if (user == null) {
            user = User.builder()
                    .userEmail(email)
                    .userName((String) userInfo.get("name"))
                    .userProfileImg((String) userInfo.get("picture"))
                    .build();
            userRepository.save(user);
            isNewUser = true;
        }

        // 사용자 정보를 기반으로 필요한 응답 반환 로직 구현
        UserInfoResDto userInfoResDto = authService.getUserInfo(user.getUserEmail());
        userInfoResDto.setIsNewUser(isNewUser);

        return ResponseEntity.ok(new BaseResponse<>(userInfoResDto));
    }
}
