package ssafy.ggame.domain.recommendation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.code.entity.Code;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.game.repository.GameRepository;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.gameTag.repository.GameTagRepository;
import ssafy.ggame.domain.prefer.entity.Prefer;
import ssafy.ggame.domain.prefer.repository.PreferRepository;
import ssafy.ggame.domain.tag.dto.TagDto;
import ssafy.ggame.domain.tag.entity.Tag;
import ssafy.ggame.domain.code.repository.CodeRepository;
import ssafy.ggame.domain.tag.repository.TagRepository;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.repository.UserRepository;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final UserRepository userRepository;
    private final CodeRepository codeRepository;
    private final TagRepository tagRepository;
    private final GameRepository gameRepository;
    private final GameTagRepository gameTagRepository;
    private final PreferRepository preferRepository;
    public List<GameCardDto> getPopularList(Integer userId, String codeId, Short tagId) {
        List<GameCardDto> gameCardDtoList = null;
        // 전체 게임 인기 순위
        // 로그인 전
        if(userId == 0){
            // codeId, tagId에 따라 인기게임 가져오기
            gameCardDtoList = getGameCardList(codeId, tagId);
        }
        // 로그인 후
        else{
            // 사용자가 존재하지 않을 때 예외 발생
            User user = userRepository.findById(userId).orElseThrow(()->new BaseException(StatusCode.USER_NOT_FOUND));

            // codeId, tagId에 따라 인기게임 가져오기
            gameCardDtoList = getGameCardList(codeId, tagId);

            // userId에 따라  isPrefer 가져와 업데이트 하기
            // - 유저가 선호하는 게임 아이디 목록 가져오기
            List<Prefer> preferList = preferRepository.findByUserId(userId);
            HashSet<Long> preferGameIdSet = new HashSet<>();
            for(Prefer prefer : preferList){
                preferGameIdSet.add(prefer.getPreferId().getGame().getGameId());
            }

            // - 인기게임에 선호하는 게임이 포함되어 있으면 인기게임의 isprefer를 true로 지정
            for(GameCardDto gameCardDto : gameCardDtoList){
                if(preferGameIdSet.contains(gameCardDto.getGameId())){
                    gameCardDto.updateIsPrefer(true);
                }
            }
        }
        return gameCardDtoList;
    }


    private List<GameCardDto> getGameCardList(String codeId, Short tagId){
        List<GameCardDto> gameCardDtoList = new ArrayList<>();
        // codeId, tagId에 따른 gameCardList 만들기
        // codeId 가 없을 때,
        Optional<Code> optionalCode = codeRepository.findByCodeId(codeId);
        if(!codeId.equals("0") && optionalCode.isEmpty()){
            // 해당 코드가 존재하지 않는다는 예외 발생
            throw new BaseException(StatusCode.CODE_NOT_EXIST);
        }
        // tagId가 없을 때,
        Optional<Tag> optionalTag = tagRepository.findByCodeIdAndTagId(codeId, tagId);
        if(!codeId.equals("0") && optionalTag.isEmpty()){
            // 해당 태그가 존재하지 않는다는 예외 발생
            throw new BaseException(StatusCode.TAG_NOT_EXIST);
        }

        // codeId, tagId가 둘 다 0일떄
        if(codeId.equals("0") && tagId == 0){
            List<Game> gameList = gameRepository.findAllByOrderByGameFinalScore();
            gameCardDtoList = makeGameCardDtoList(gameList);
        }

        // codeId, tagId 둘 다 0이 아닐 때
        if(!codeId.equals("0") && tagId != 0){
            // game을 인기순으로 가져온다
            List<Game> gameList = gameRepository.findAllByOrderByGameFinalScore();
            // 거기서 코드아이디(gen), tagId 로 필터링 한다.
            // - 입력으로 받은 게임태그 가져오기
            GameTag gameTag = gameTagRepository.findByCodeIdAndTagId(codeId, tagId);
            List<Game> filteredGameList = new ArrayList<>();
            for(Game game : gameList){
                // - 만약 게임이 해당 게임 태그를 가졌다면 걸러진 게임 목록에 추가
                if(game.getGameTags().contains(gameTag)){
                    filteredGameList.add(game);
                }
            }
            gameCardDtoList = makeGameCardDtoList(filteredGameList);
        }

        return gameCardDtoList;
    }

    private List<GameCardDto> makeGameCardDtoList(List<Game> gameList) {
        List<GameCardDto> gameCardDtoList = new ArrayList<>();
        for(Game game : gameList){
            GameCardDto gameCardDto = game.converToGameCardDto();
            //tagList 업데이트
            List<TagDto> tagDtoList = new ArrayList<>();
            for(GameTag tag : game.getGameTags()){
                tagDtoList.add(tag.convertToTagDto());
            }
            gameCardDto.updateTagList(tagDtoList);
            gameCardDtoList.add(gameCardDto);
        }
        return gameCardDtoList;
    }
}
