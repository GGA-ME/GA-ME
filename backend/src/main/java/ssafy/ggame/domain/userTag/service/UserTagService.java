package ssafy.ggame.domain.userTag.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.userTag.entity.UserTag;
import ssafy.ggame.domain.userTag.repository.UserTagRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserTagService {

    @Autowired
    private UserTagRepository userTagRepository;

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


    /*
    @Transactional
    public void updateWeightByAction(Integer userId, Long gameId, String action) {

        // 먼저 Game 엔티티를 조회
        Game game = new Game();
        game.setGameId(gameId); // 이 부분은 실제로는 GameRepository를 통해 DB에서 Game 엔티티를 가져와야 합니다.

        // gameId에 해당하는 모든 GameTag 조회
        List<GameTag> gameTags = gameTagRepository.findByGame(game);


        for (GameTag gameTag : gameTags) {
            Tag tag = gameTag.getTag();
            Optional<UserTag> userTagOpt = userTagRepository.findByUserUserIdAndTagTagId(userId, tag.getTagId());

            UserTag userTag;
            if (userTagOpt.isPresent()) {
                // 이미 존재하는 경우, 가중치 업데이트
                userTag = userTagOpt.get();
                // action 값에 따라 userTagWeight 업데이트 로직을 구현
                // 예: userTag.setUserTagWeight((short)(userTag.getUserTagWeight() + 1));
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
                userTag.setUserTagWeight((short) (userTag.getUserTagWeight() + weightToAdd));
                // UserTag 저장
                userTagRepository.save(userTag);
            }
        }
    }*/
}

