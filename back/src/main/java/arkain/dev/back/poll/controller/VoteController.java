package arkain.dev.back.poll.controller;

import arkain.dev.back.poll.app.PollService;
import arkain.dev.back.poll.dto.PollResponse;
import arkain.dev.back.poll.dto.VoteMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class VoteController {

    private final PollService pollService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/vote")
    public void handleVote(VoteMessage message) {
        log.info("handleVote: {}", message);
        pollService.vote(message);
        PollResponse updated = pollService.getPoll(message.pollId());

        simpMessagingTemplate.convertAndSend("/topic/polls/" + message.pollId(), updated);
    }
}
