package arkain.dev.back.poll.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private int votes = 0;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "poll_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Poll poll;

    public static Option of(String name) {
        Option option = new Option();
        option.name = name;
        return option;
    }
}
