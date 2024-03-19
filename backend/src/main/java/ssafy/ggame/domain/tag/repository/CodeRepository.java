package ssafy.ggame.domain.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ggame.domain.tag.entity.Tag;

import java.util.List;
import java.util.Optional;

public interface CodeRepository extends JpaRepository<String, String> {
    Optional<String> findByCodeId(String codeId);

}
