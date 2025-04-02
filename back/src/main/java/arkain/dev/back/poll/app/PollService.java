package arkain.dev.back.poll.app;

import arkain.dev.back.poll.domain.Option;
import arkain.dev.back.poll.domain.Poll;
import arkain.dev.back.poll.dto.CreatePollRequest;
import arkain.dev.back.poll.dto.CreatePollResponse;
import arkain.dev.back.poll.dto.PollResponse;
import arkain.dev.back.poll.repository.PollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepository pollRepository;

    public CreatePollResponse createPoll(CreatePollRequest request) {
        List<Option> options = request.options().stream()
                .map(Option::of)
                .toList();

        Poll poll = Poll.create(request.title());
        options.forEach(poll::addOption);
        pollRepository.save(poll);

        return new CreatePollResponse(poll.getId());
    }

    public PollResponse getPoll(String pollId) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new IllegalArgumentException("Poll not found"));

        return PollResponse.from(poll);
    }
}
