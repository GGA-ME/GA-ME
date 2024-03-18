package ssafy.ggame.domain.userTag.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.gameTag.entity.GameTag;
import ssafy.ggame.domain.gameTag.repository.GameTagRepository;
import ssafy.ggame.domain.userTag.entity.UserTag;
import ssafy.ggame.domain.userTag.repository.UserTagRepository;

import java.util.List;
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

    // 특정 UserTag 조회
    public Optional<UserTag> getUserTagById(Long id) {
        return userTagRepository.findById(id);
    }

    // 모든 UserTag 목록 조회
    public List<UserTag> getAllUserTags() {
        return userTagRepository.findAll();
    }

    // UserTag 저장 또는 업데이트
    public UserTag saveOrUpdateUserTag(UserTag userTag) {
        return userTagRepository.save(userTag);
    }

    // UserTag 삭제
    public void deleteUserTag(Long id) {
        userTagRepository.deleteById(id);
    }

    @Transactional
    public void updateWeightByAction(Integer userId, Long tagId, String action) {
        Optional<UserTag> userTagOptional = userTagRepository.findByUserIdAndTagId(userId, tagId);
        UserTag userTag = userTagOptional.orElseGet(() -> {
            UserTag newUserTag = new UserTag();
            // 필요한 경우 User, Tag, CommonCode 엔티티 참조 설정
            newUserTag.setUserTagWeight((short) 0);
            return newUserTag;
        });

        // 액션에 따라 가중치 조정
        short weightToAdd = 0;
        switch (action) {
            case "Detail":
                weightToAdd = 1;
                break;
            case "Steam":
                weightToAdd = 5;
                break;
            case "Like":
                weightToAdd = 10;
                break;
            case "SNS":
                weightToAdd = 2;
                break;
            case "Video":
                weightToAdd = 1;
                break;
            case "Ignore":
                weightToAdd = -20;
                break;
        }

        System.out.println("Set userId: "+userId+" tagId: "+tagId+" action: "+action+" plus "+weightToAdd);

        //userTag.setUserTagWeight((short) (userTag.getUserTagWeight() + weightToAdd));
        //userTagRepository.save(userTag);
    }
}

