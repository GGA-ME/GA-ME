package ssafy.ggame.global.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization")
                .allowCredentials(true)
                .maxAge(3600);
    }
    //
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//
//        config.setAllowCredentials(true);
//        config.setAllowedOrigins(List.of(
////                "https://j10e105.p.ssafy.io",   //도메인
////                "http://localhost:5173",        //로컬
////                "http://192.168.30.125:5173",   //윤민
////                "http://192.168.30.153:5173",   //하영
////                "http://192.168.30.194:5173",   //종국
////                "http://192.168.30.187:5173",   //상훈
////                "http://192.168.30.159:5173",   //현욱
////                "http://192.168.30.224:5173"    //라엘
//                "*"
//        ));
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
//        config.setAllowedHeaders(List.of("*"));
//        config.setExposedHeaders(List.of("*"));
//        config.setAllow
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//
//        return source;
//    }
}
