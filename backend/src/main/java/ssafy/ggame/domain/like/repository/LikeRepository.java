package ssafy.ggame.domain.like.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ggame.domain.like.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Integer> {

}
