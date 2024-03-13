package ssafy.ggame.domain.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.ggame.domain.user.dto.UserDto;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /*@GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id " + id));
        UserDto userDto = new UserDto();
        // Entity를 DTO로 변환
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());
        userDto.setImageUrl(user.getImageUrl());
        return ResponseEntity.ok(userDto);
    }*/
}
