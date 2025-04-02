package arkain.dev.back.poll.repository;

import arkain.dev.back.poll.domain.Poll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollRepository extends JpaRepository<Poll, String> {
}
