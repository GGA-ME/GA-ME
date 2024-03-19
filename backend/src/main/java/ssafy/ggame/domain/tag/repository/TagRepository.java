package ssafy.ggame.domain.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ggame.domain.tag.entity.Tag;
import ssafy.ggame.domain.tag.entity.TagCompositeKey;

import java.util.Optional;

public interface TagRepository extends JpaRepository<TagCompositeKey, String> {
    Optional<Tag> findByCodeIdAndTagId(String codeId, short tagId);

}
