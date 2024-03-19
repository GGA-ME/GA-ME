package ssafy.ggame.domain.prefer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ggame.domain.prefer.entity.Prefer;
import ssafy.ggame.domain.prefer.entity.PreferId;

public interface PreferRepository extends JpaRepository<Prefer, PreferId> {

}
