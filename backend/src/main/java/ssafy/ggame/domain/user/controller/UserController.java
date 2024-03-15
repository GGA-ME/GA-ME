package ssafy.ggame.domain.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.user.dto.UserDto;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.service.UserService;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new BaseException(StatusCode.USER_NOT_FOUND));
        UserDto userDto = new UserDto();
        // Entity를 DTO로 변환
        userDto.setUserEmail(user.getUserEmail());
        userDto.setUserName(user.getUserName());
        userDto.setUserProfileImg(user.getUserProfileImg());
        return ResponseEntity.ok(userDto);
    }
}
