package ssafy.ggame.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.gameChoice.service.GameChoiceService;
import ssafy.ggame.domain.user.service.UserService;

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
