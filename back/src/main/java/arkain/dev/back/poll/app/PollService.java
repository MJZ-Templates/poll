package arkain.dev.back.poll.app;

import arkain.dev.back.poll.domain.Option;
import arkain.dev.back.poll.domain.Poll;
import arkain.dev.back.poll.dto.CreatePollRequest;
import arkain.dev.back.poll.dto.CreatePollResponse;
import arkain.dev.back.poll.dto.PollResponse;
import arkain.dev.back.poll.dto.VoteMessage;
import arkain.dev.back.poll.repository.PollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PollService {

    private final PollRepository pollRepository;

    public Poll findPoll(String id) {
        return pollRepository.findByIdWithOptions(id)
                .orElseThrow(() -> new IllegalArgumentException("Poll not found"));
    }

    public CreatePollResponse createPoll(CreatePollRequest request) {
        List<Option> options = request.options().stream()
                .map(Option::of)
                .toList();

        Poll poll = Poll.create(request.title());
        options.forEach(poll::addOption);
        pollRepository.save(poll);

        return new CreatePollResponse(poll.getId());
    }

    @Transactional(readOnly = true)
    public PollResponse getPoll(String pollId) {
        Poll poll = findPoll(pollId);

        return PollResponse.from(poll);
    }

    public void vote(VoteMessage message) {
        Poll poll = findPoll(message.pollId());
        poll.getOptions().stream()
                .filter(option -> option.getId().equals(message.optionId()))
                .findFirst()
                .ifPresent(Option::vote);
        pollRepository.save(poll);
    }
}
