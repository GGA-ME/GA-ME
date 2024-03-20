package ssafy.ggame.domain.userTag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.userTag.entity.UserTag;
import ssafy.ggame.domain.userTag.entity.UserTagId;

import java.util.List;
import java.util.Optional;

public interface UserTagRepository extends JpaRepository<UserTag, UserTagId> { // UserTag의 ID 타입이 Long이므로, Long으로 수정

//    // 특정 userId와 tagId를 가진 UserTag 조회
//    Optional<UserTag> findByUserUserIdAndTagTagId(Integer userId, Short tagId);
//
//    // 특정 userId를 가진 UserTag 목록을 조회
//    List<UserTag> findByUserUserId(Integer userId);
//
//    // 특정 tagId를 가진 UserTag 목록을 조회
//    List<UserTag> findByTagTagId(Short tagId);
//

    // 유저의 태그 가중치 중 내림차순으로 10개를 가져옴
    List<UserTag> findFirst10ByUserTagId_UserOrderByUserTagWeightDesc(User userTagId_user);
}

