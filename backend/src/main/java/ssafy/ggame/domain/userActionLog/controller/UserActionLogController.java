package ssafy.ggame.domain.userActionLog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.userActionLog.dto.UserActionLogResponseDto;
import ssafy.ggame.domain.userActionLog.entity.UserActionLog;
import ssafy.ggame.domain.userActionLog.service.UserActionLogService;
import ssafy.ggame.global.common.BaseResponse;
import ssafy.ggame.global.common.StatusCode;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tracking")
public class UserActionLogController {

    private final UserActionLogService userActionLogService;

    @Autowired
    public UserActionLogController(UserActionLogService userActionLogService) {
        this.userActionLogService = userActionLogService;
    }

    @PostMapping("/log")
    public ResponseEntity<Object> logUserAction(@RequestBody Map<String, Object> requestData) {
        UserActionLogResponseDto responseDto;

        Integer userId = (Integer) requestData.get("userId");
        String page = (String) requestData.get("page");
        String action = (String) requestData.get("action");
        List<Map<String, Object>> args = (List<Map<String, Object>>) requestData.get("args"); // "args"를 읽어옵니다.

        responseDto = userActionLogService.loggingUserTagWeight(userId, page, action, args); // args를 넘깁니다.

        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(responseDto));
    }
}
