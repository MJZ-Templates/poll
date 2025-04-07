package arkain.dev.back.poll.repository;

import arkain.dev.back.poll.domain.Poll;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PollRepository extends JpaRepository<Poll, String> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Poll p" +
            " join fetch p.options o")
    Optional<Poll> findByIdWithOptions(String id);
}
