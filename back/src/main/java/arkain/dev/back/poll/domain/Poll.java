package arkain.dev.back.poll.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Poll {

    @Id
    private String id = UUID.randomUUID().toString();

    private String title;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options = new ArrayList<>();

    public static Poll create(String title) {
        Poll poll = new Poll();
        poll.title = title;
        return poll;
    }

    public void addOption(Option option) {
        options.add(option);
        option.setPoll(this);
    }
}
