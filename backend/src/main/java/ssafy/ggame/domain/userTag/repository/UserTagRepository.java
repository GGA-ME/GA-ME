package ssafy.ggame.domain.userTag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.ggame.domain.user.entity.User;
import ssafy.ggame.domain.userTag.entity.UserTag;
import ssafy.ggame.domain.userTag.entity.UserTagId;

import java.util.List;
import java.util.Optional;

public interface UserTagRepository extends JpaRepository<UserTag, UserTagId> {
    // JPQL을 사용하여 User의 ID, Tag의 tagId, codeId를 기반으로 UserTag를 조회하는 메서드
    @Query("SELECT ut FROM UserTag ut WHERE ut.userTagId.user.userId = :userId AND ut.userTagId.tag.tagId.tagId = :tagId AND ut.userTagId.tag.tagId.code.codeId = :codeId")
    Optional<UserTag> findByUserIdAndTagIdAndCodeId(@Param("userId") Integer userId, @Param("tagId") Short tagId, @Param("codeId") String codeId);

    List<UserTag> findFirst10ByUserTagId_UserOrderByUserTagWeight(User userTagId_user);
}

