package ssafy.ggame.domain.prefer.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.game.repository.GameRepository;
import ssafy.ggame.domain.prefer.dto.PreferRequestDto;
import ssafy.ggame.domain.prefer.entity.Prefer;
import ssafy.ggame.domain.prefer.entity.PreferId;
import ssafy.ggame.domain.prefer.repository.PreferRepository;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.repository.UserRepository;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

@Service
@Transactional
@RequiredArgsConstructor
public class PreferServiceImpl implements PreferService{
    private final PreferRepository preferRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;


    @Override
    public boolean savePrefer(PreferRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId()).orElseThrow(() -> new BaseException(StatusCode.USER_NOT_FOUND));
        Game game = gameRepository.findById(requestDto.getGameId()).orElseThrow(() -> new BaseException(StatusCode.GAME_NOT_FOUND));
        Prefer prefer = Prefer.builder().preferId(PreferId.builder().user(user).game(game).build()).build();
        preferRepository.save(prefer);
        return true;
    }
}
