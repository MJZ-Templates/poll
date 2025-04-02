package arkain.dev.back.poll.dto;

import java.util.List;

public record CreatePollRequest(String title, List<String> options) {
}
