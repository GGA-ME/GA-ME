package ssafy.ggame.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 기타 보안 설정
                .authorizeRequests(authorize -> authorize
//                        .antMatchers("/restricted/**").authenticated() // "/restricted" 경로와 그 하위 경로는 인증된 사용자만 접근 가능
//                        .antMatchers("/admin/**").hasRole("ADMIN") // "/admin" 경로와 그 하위 경로는 "ADMIN" 역할을 가진 사용자만 접근 가능
                        .anyRequest().permitAll() // 위에서 명시하지 않은 그 외의 모든 요청은 누구나 접근 가능
                )
                .oauth2Login(oauth2 -> oauth2
                                .loginPage("/user/login") // 사용자 정의 로그인 페이지 경로 설정
                        // OAuth2 로그인 성공 후 리다이렉트 될 기본 URL 설정 가능
                        .defaultSuccessUrl("/test", true)
                );
        // 기타 설정
        return http.build();
    }
}

