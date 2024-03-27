package ssafy.ggame.domain.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import ssafy.ggame.domain.user.dto.UserInfoResDto;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.repository.UserRepository;
import ssafy.ggame.domain.user.service.AuthService;
import ssafy.ggame.global.common.BaseResponse;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${spring.kakao.client-id}")
    private String clientId;

    @Value("${spring.kakao.client-secret}")
    private String clientSecret;

    @Value("${spring.kakao.redirect-uri}")
    private String redirectUri;

    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/kakao/login")
    public ResponseEntity<String> redirectToKakaoOAuth() {
        String kakaoOAuthUrl = "https://kauth.kakao.com/oauth/authorize?"
                + "client_id=" + clientId
                + "&redirect_uri=" + redirectUri
                + "&response_type=code";
        return ResponseEntity.ok(kakaoOAuthUrl);
    }
    @PostMapping("/kakao/callback")
    public ResponseEntity<BaseResponse<UserInfoResDto>> handleKakaoCallback(@RequestParam String code) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        params.add("client_secret", clientSecret);

        System.out.println("params: "+params.get(clientId));
        System.out.println("redirect_uri: "+params.get(redirectUri));

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        System.out.println("before response");
        ResponseEntity<Map> response = restTemplate.postForEntity("https://kauth.kakao.com/oauth/token", request, Map.class);
        System.out.println("after response");
        Map<String, Object> responseBody = response.getBody();
        String accessToken = (String) responseBody.get("access_token");

        System.out.println("responseBody: "+accessToken);

        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.setBearerAuth(accessToken);
        HttpEntity<?> userInfoRequest = new HttpEntity<>(userInfoHeaders);

        System.out.println("before userInfo response");
        ResponseEntity<Map> userInfoResponse = restTemplate.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.GET, userInfoRequest, Map.class);
        Map<String, Object> userInfo = userInfoResponse.getBody();
        System.out.println("after userInfo response");

        Map<String, Object> kakaoAccount = (Map<String, Object>) userInfo.get("kakao_account");
        String email = (String) kakaoAccount.get("email");

        System.out.println("email: "+email);

        Optional<User> userOptional = userRepository.findByUserEmail(email);

        boolean isNewUser = !userOptional.isPresent();
        User user = userOptional.orElseGet(() -> {
            User newUser = User.builder()
                    .userEmail(email)
                    .userName((String)((Map<String, Object>)userInfo.get("properties")).get("nickname"))
                    .userProfileImg((String)((Map<String, Object>)kakaoAccount.get("profile")).get("thumbnail_image_url"))
                    .userLastLoginDt(LocalDate.now())
                    .build();
            return userRepository.save(newUser);
        });

        UserInfoResDto userInfoResDto = authService.getUserInfo(user.getUserEmail());

        return ResponseEntity.ok(new BaseResponse<>(userInfoResDto));
    }
}
