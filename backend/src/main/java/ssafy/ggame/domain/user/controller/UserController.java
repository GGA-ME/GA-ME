package ssafy.ggame.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.gameChoice.service.GameChoiceService;
import ssafy.ggame.domain.user.dto.UserDetailResDto;
import ssafy.ggame.domain.user.dto.UserDto;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.service.UserService;
import ssafy.ggame.global.common.BaseResponse;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final GameChoiceService gameChoiceService;

    @GetMapping("/{userId}")
    public ResponseEntity<Object> myPage(@PathVariable Integer userId){
        return this.userService.userDetail(userId);
    }

    @GetMapping("/choice-game")
    public ResponseEntity<Object> surveyGames(){
        return this.gameChoiceService.getGameList();
    }


}
