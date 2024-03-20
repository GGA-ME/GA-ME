package ssafy.ggame.domain.prefer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.ggame.domain.prefer.entity.Prefer;
import ssafy.ggame.domain.prefer.entity.PreferId;

import java.util.List;

public interface PreferRepository extends JpaRepository<Prefer, PreferId> {

    @Query("SELECT p FROM Prefer p where p.preferId.user.userId = :userId")
    List<Prefer> findByUserId(Integer userId);

}
