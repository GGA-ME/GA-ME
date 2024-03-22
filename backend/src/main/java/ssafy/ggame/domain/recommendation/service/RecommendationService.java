package ssafy.ggame.domain.recommendation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.code.entity.Code;
import ssafy.ggame.domain.game.dto.GameCardDto;
import ssafy.ggame.domain.game.entity.Game;
import ssafy.ggame.domain.game.repository.GameRepository;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.gameTag.repository.GameTagRepository;
import ssafy.ggame.domain.prefer.entity.Prefer;
import ssafy.ggame.domain.prefer.repository.PreferRepository;
import ssafy.ggame.domain.recommendation.dto.GameIdAndTagDto;
import ssafy.ggame.domain.recommendation.dto.SearchGameRequestDto;
import ssafy.ggame.domain.tag.dto.TagDto;
import ssafy.ggame.domain.tag.entity.Tag;
import ssafy.ggame.domain.code.repository.CodeRepository;
import ssafy.ggame.domain.tag.repository.TagRepository;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.user.repository.UserRepository;
import ssafy.ggame.domain.userTag.entity.UserTag;
import ssafy.ggame.domain.userTag.repository.UserTagRepository;
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
    private final UserTagRepository userTagRepository;
    public List<GameCardDto> getPopularList(Integer userId, String codeId, Short tagId, int page, int size) {
        List<GameCardDto> gameCardDtoList = null;
        // 전체 게임 인기 순위
        // 로그인 전
        if(userId == 0){
            // codeId, tagId에 따라 인기게임 가져오기
            gameCardDtoList = getGameCardList(codeId, tagId, page, size);
        }
        // 로그인 후
        else{
            // 사용자가 존재하지 않을 때 예외 발생
            User user = userRepository.findById(userId).orElseThrow(()->new BaseException(StatusCode.USER_NOT_FOUND));

            // codeId, tagId에 따라 인기게임 가져오기
            gameCardDtoList = getGameCardList(codeId, tagId, page, size);

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

    private List<GameCardDto> getGameCardList(String codeId, Short tagId, int page, int size){

        Pageable pageable = PageRequest.of(page, size);

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
            List<Game> gameList = gameRepository.findAllByOrderByGameFinalScore(pageable);
            gameCardDtoList = makeGameCardDtoList(gameList);
        }

        // codeId, tagId 둘 다 0이 아닐 때
        if(!codeId.equals("0") && tagId != 0){
            // game을 인기순으로 가져온다
            List<Game> gameList = gameRepository.findAllByOrderByGameFinalScore(pageable);
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

    public List<GameCardDto> getPersonalList(Integer userId) {
        // 사용자 존재 유무 확인
        User user = userRepository.findById(userId).orElseThrow(() -> new BaseException(StatusCode.USER_NOT_FOUND));

        // 1. 사용자 가중치 top 20개 태그 가져오기
        List<UserTag> topUsertagList = userTagRepository.findFirst20ByUserTagId_UserOrderByUserTagWeightDesc(user);

        // 게임별 점수를 저장할 맵 (게임 아이디 - 가중치 합)
        Map<Long, Double> gameScoreMap = new TreeMap<>();

        // 게임별 개인 가중치 합 구하기(gameWeightMap 완성하기)
        // 전체 게임에서 태그가 포함된 게임 가져오기
        for (UserTag userTag : topUsertagList) {

            // 해당 태그의 가중치
            Short userTagWeight = userTag.getUserTagWeight();

            // 해당 태그를 포함한 게임 아이디 리스트
            List<GameTag> gameTagList = gameTagRepository.findAllByTag_TagId_Code_CodeIdAndTag_TagId_TagId(
                    userTag.getUserTagId().getTag().getTagId().getCode().getCodeId(),
                    userTag.getUserTagId().getTag().getTagId().getTagId());

            // 각 게임 아이디에 대해 가중치 점수 더해주기
            for (GameTag gameTag : gameTagList) {
                Long gameId = gameTag.getGame().getGameId();
                gameScoreMap.put(gameId, gameScoreMap.getOrDefault(gameId, 0.0) + userTagWeight);
            }
        }

        // 게임점수 계산해서 정렬한 후 내림차순 TOP 100만 가져오기
        // 게임점수 계산
        gameScoreMap = calculateGameScore(gameScoreMap);

        // 맵 value에 따른 내림차순 정렬 후 100개 가져오기
        List<Map.Entry<Long, Double>> gameWeightList = new ArrayList<>(gameScoreMap.entrySet());

        // TreeMap을 List로 변환
        List<Map.Entry<Long, Double>> sortedGameScoreList = new ArrayList<>(gameScoreMap.entrySet());

        // 값으로 내림차순으로 정렬
        Collections.sort(sortedGameScoreList, valueComparator);
//        gameWeightList.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        // 상위 100개의 항목 가져오기
//        List<Map.Entry<Long, Double>> top100List = gameWeightList.subList(0, Math.min(100, gameWeightList.size()));
        List<Map.Entry<Long, Double>> top100List = gameWeightList.subList(0, Math.min(100, sortedGameScoreList.size()));

        // 결과 출력
        List<GameCardDto> gameCardDtoList = sortedGameCardDtoList(userId, top100List);

        return gameCardDtoList;
    }


    public List<GameCardDto> searchGameList(SearchGameRequestDto searchGameRequestDto) {

        // 게임 아이디, 게임 태그 리스트
        List<GameIdAndTagDto> gameIdAndTagDtoList = searchGameRequestDto.getGameIdAndTagDtoList();

        // 1. 담은 게임의 태그별 빈도수 세기(가중치)
        Map<TagDto,Long> tagCntMap = new HashMap<>();
        for(GameIdAndTagDto gameIdAndTagDto : gameIdAndTagDtoList){
            for(TagDto tagDto : gameIdAndTagDto.getTagList()){
                tagCntMap.put(tagDto, tagCntMap.getOrDefault(tagDto, 0L) + 1L);
            }
        }

        // 게임별 빈도수 점수 (gameId - 빈도수 점수)
        Map<Long, Double> gameScoreMap = new TreeMap<>();

        // 각 태그를 포함한 게임에 빈도수 더하기 => 각 게임의 점수가 나오게 됨
        for(Map.Entry<TagDto, Long> entry : tagCntMap.entrySet()){

            // 해당 태그를 가진 게임 아이디 리스트
            List<GameTag> gameTagList = gameTagRepository.findAllByTag_TagId_Code_CodeIdAndTag_TagId_TagId(
                    entry.getKey().getCodeId(),
                    entry.getKey().getTagId());

            // 각 게임 아이디에 대해 가중치 점수 더해주기
            for(GameTag gameTag : gameTagList){
                Long gameId = gameTag.getGame().getGameId();
                gameScoreMap.put(gameId, gameScoreMap.getOrDefault(gameId, 0.0) + entry.getValue());
            }
        }
        // 게임 점수 저장 후 게임 점수로 내림차순 정렬
        // 게임 점수 저장
        gameScoreMap = calculateGameScore(gameScoreMap);

        // TreeMap을 List로 변환
        List<Map.Entry<Long, Double>> sortedGameScoreList = new ArrayList<>(gameScoreMap.entrySet());

        // 값으로 내림차순으로 정렬
        Collections.sort(sortedGameScoreList, valueComparator);

        //원하는 갯수만큼 Dto로 변환하여 결과 리턴
        Integer userId = searchGameRequestDto.getUserId();
        List<GameCardDto> gameCardDtoList = sortedGameCardDtoList( userId, sortedGameScoreList);

        return gameCardDtoList;

    }

    private List<GameCardDto> sortedGameCardDtoList(Integer userId, List<Map.Entry<Long, Double>> list){
        List<GameCardDto> gameCardDtoList = new ArrayList<>();

        for (Map.Entry<Long, Double> entry : list) {
            Game game = gameRepository.findById(entry.getKey()).orElseThrow(()->new BaseException(StatusCode.GAME_NOT_FOUND));
            GameCardDto gameCardDto = game.converToGameCardDto();
            // 선호 여부 업데이트
            if(preferRepository.existsByPreferId_User_UserIdAndPreferId_Game_GameId(userId, game.getGameId())){
                gameCardDto.updateIsPrefer(true);
            }
            gameCardDtoList.add(gameCardDto);
        }
        return gameCardDtoList;
    }

    private Map<Long, Double> calculateGameScore(Map<Long, Double> gameScoreMap) {
        for (Long key : gameScoreMap.keySet()) {
            double score1 = Math.log(gameScoreMap.get(key) + 100) * 0.7;
            Game game = gameRepository.findById(key).orElseThrow(() -> new BaseException(StatusCode.GAME_NOT_FOUND));
            double score2 = game.getGameFinalScore() * 0.3;

            gameScoreMap.put(key, (score1 + score2));
        }
        return gameScoreMap;
    }

    private Comparator<Map.Entry<Long, Double>> valueComparator = (e1, e2) -> {
        return e2.getValue().compareTo(e1.getValue()); // 내림차순으로 정렬;
    };
}
