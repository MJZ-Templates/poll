package arkain.dev.back.poll.controller;

import arkain.dev.back.poll.app.PollService;
import arkain.dev.back.poll.dto.CreatePollRequest;
import arkain.dev.back.poll.dto.CreatePollResponse;
import arkain.dev.back.poll.dto.PollResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/polls")
@RequiredArgsConstructor
public class PollController {

    private final PollService pollService;

    @PostMapping
    public ResponseEntity<CreatePollResponse> createPoll(@RequestBody CreatePollRequest request) {
        return ResponseEntity.ok(pollService.createPoll(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PollResponse> getPoll(@PathVariable String id) {
        return ResponseEntity.ok(pollService.getPoll(id));
    }
}
