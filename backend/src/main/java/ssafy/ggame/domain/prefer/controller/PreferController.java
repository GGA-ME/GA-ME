package ssafy.ggame.domain.prefer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ggame.domain.prefer.dto.PreferRequestDto;
import ssafy.ggame.domain.prefer.service.PreferService;
import ssafy.ggame.global.common.BaseResponse;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;


@RestController
@RequestMapping("/api/game/prefer")
@RequiredArgsConstructor
public class PreferController {
    private final PreferService preferService;
    @PostMapping
    public ResponseEntity<Object> savePrefer(@RequestBody PreferRequestDto saveRequestDto) {
        boolean result = preferService.savePrefer(saveRequestDto);
        if(!result){
            return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.PREFER_CANNOT_SAVE));
        }else {
            return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.SUCCESS));
        }
    }

    @DeleteMapping
    public ResponseEntity<Object> deletePrefer(@RequestBody PreferRequestDto preferRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.SUCCESS));
    }
    


}
