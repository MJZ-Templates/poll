package arkain.dev.back.poll.dto;

import arkain.dev.back.poll.domain.Poll;

import java.util.List;

public record PollResponse(
        String id,
        String title,
        List<OptionDto> options
) {
    public static PollResponse from(Poll poll) {
        return new PollResponse(
                poll.getId(),
                poll.getTitle(),
                poll.getOptions().stream()
                        .map(opt -> new OptionDto(opt.getId(), opt.getName(), opt.getVotes()))
                        .toList()
        );
    }

    public record OptionDto(Long id, String name, int votes) {}
}
