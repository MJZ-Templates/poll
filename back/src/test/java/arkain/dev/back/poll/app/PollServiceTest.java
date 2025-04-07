package arkain.dev.back.poll.app;

import arkain.dev.back.poll.domain.Option;
import arkain.dev.back.poll.domain.Poll;
import arkain.dev.back.poll.dto.CreatePollRequest;
import arkain.dev.back.poll.dto.CreatePollResponse;
import arkain.dev.back.poll.dto.VoteMessage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PollServiceTest {

    @Autowired
    PollService pollService;

    @Test
    void givenHundredPeople_whenVoteConcurrently_thenPollCountsMustBeHundred() throws InterruptedException {
        // given
        CreatePollRequest createRequest = new CreatePollRequest("Test Poll", List.of("Option1"));
        CreatePollResponse createResponse = pollService.createPoll(createRequest);
        String pollId = createResponse.id();
        Poll poll = pollService.findPoll(pollId);
        Option option = poll.getOptions().getFirst();
        Long optionId = option.getId();

        // when
        VoteMessage voteMessage = new VoteMessage(pollId, optionId);
        final int VOTE_NUMBER = 100;
        final int THREAD_COUNT = 10;
        ExecutorService executor = Executors.newFixedThreadPool(THREAD_COUNT);
        CountDownLatch latch = new CountDownLatch(VOTE_NUMBER);

        for (int i = 0; i < VOTE_NUMBER; i++) {
            executor.execute(() -> {
                try {
                    pollService.vote(voteMessage);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        executor.shutdown();
        executor.close();

        // then
        Poll resultPoll = pollService.findPoll(pollId);
        Option resultOption = resultPoll.getOptions().getFirst();
        assertThat(resultOption.getVotes()).isEqualTo(VOTE_NUMBER);
    }
}