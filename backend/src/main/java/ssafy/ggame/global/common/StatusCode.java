package ssafy.ggame.global.common;
import lombok.Getter;

@Getter
public enum StatusCode {
    // Success
    SUCCESS(true, 100, "요청에 성공하였습니다."),


    // COMMON
    FORBIDDEN_REQUEST(false, 202, "접근 권한이 없습니다."),

    //회원 : 300
    LOGIN_FAIL(false, 300, "로그인에 실패했습니다."),
    USER_NOT_FOUND(false,301,"유저를 찾을 수 없습니다."),

    //회원-태그: 400
    USER_TAG_NOT_FOUND(false, 400, "회원에게서 태그를 찾을 수 없습니다."),

    //게임 : 500
    GAME_NOT_FOUND(false, 500,"게임을 찾을 수 없습니다." ),

    //좋아요 : 600
    PREFER_CANNOT_SAVE(false,600,"좋아요를 등록할 수 없습니다."),

    //태그: 700
    TAG_NOT_FOUND(false, 700, "태그를 찾을 수 없습니다.")
    ;

    private final boolean isSuccess;
    private final int code;
    private final String message;

    StatusCode(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }
}
