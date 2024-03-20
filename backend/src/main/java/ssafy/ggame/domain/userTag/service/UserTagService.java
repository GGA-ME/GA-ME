package ssafy.ggame.domain.userTag.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.tag.entity.Tag;
import ssafy.ggame.domain.tag.entity.TagId;
import ssafy.ggame.domain.userTag.entity.UserTag;
import ssafy.ggame.domain.userTag.entity.UserTagId;
import ssafy.ggame.domain.userTag.repository.UserTagRepository;
import ssafy.ggame.domain.gameTag.repository.GameTagRepository;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.util.Optional;

@Service
public class UserTagService {

    private final UserTagRepository userTagRepository;
    private final GameTagRepository gameTagRepository;

    @Autowired
    public UserTagService(UserTagRepository userTagRepository, GameTagRepository gameTagRepository) {
        this.userTagRepository = userTagRepository;
        this.gameTagRepository = gameTagRepository;
    }

    @Transactional
    public void updateUserTagWeight(Integer userId, Long gameId, String action) {
        short weightToAdd = determineWeightToAdd(action);

        // 해당 게임의 모든 태그를 조회
        var gameTags = gameTagRepository.findByGame_GameId(gameId);
        for (GameTag gameTag : gameTags) {
            Tag tag = gameTag.getTag();
            TagId tagId = tag.getTagId(); // Tag 엔티티의 TagId 복합 키 객체를 얻습니다.

            // TagId 객체에서 tagId와 codeId를 추출.
            Short tagIdValue = tagId.getTagId(); // 태그 ID
            String codeIdValue = tagId.getCode().getCodeId(); // 코드 ID

            // 사용자 ID, 태그 ID, 코드 ID로 사용자 태그를 조회하거나 새로 생성
            Optional<UserTag> userTagOptional = userTagRepository.findByUserIdAndTagIdAndCodeId(userId, tagIdValue, codeIdValue);
            UserTag userTag = userTagOptional.orElseThrow(() -> new BaseException(StatusCode.USER_TAG_NOT_FOUND));

            // 가중치 업데이트
            short newWeight = (short) (userTag.getUserTagWeight() + weightToAdd);
            userTag.setUserTagWeight(newWeight);

            userTagRepository.save(userTag); // 변경된 가중치 저장
        }
    }


    private short determineWeightToAdd(String action) {
        short weightToAdd = 0;
        switch (action) {
            case "detail":
                weightToAdd = 1;
                break;
            case "go-steam":
                weightToAdd = 5;
                break;
            case "like":
                weightToAdd = 10;
                break;
            case "relational":
                weightToAdd = 2;
                break;
            case "video-play":
                weightToAdd = 1;
                break;
            case "dislike":
                weightToAdd = -20;
                break;
        }
        return weightToAdd;
    }
}


