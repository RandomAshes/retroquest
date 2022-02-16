package com.ford.labs.retroquest.metrics;

import com.ford.labs.retroquest.feedback.Feedback;
import com.ford.labs.retroquest.feedback.FeedbackRepository;
import com.ford.labs.retroquest.team.Team;
import com.ford.labs.retroquest.team.TeamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class MetricsServiceTest {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    MetricsService metricsService;

    @BeforeEach
    void setup() {
        teamRepository.deleteAll();
        feedbackRepository.deleteAll();
    }

    @Test
    public void getTeamCount_ReturnsNumberOfTeamsCreated() {
        var teamBuilder = new Team().toBuilder();
        teamRepository.save(teamBuilder.lastLoginDate(LocalDate.now()).uri("something").build());
        teamRepository.save(teamBuilder.lastLoginDate(LocalDate.now().minus(Period.ofMonths(4))).uri("somethingelse").build());
        assertThat(metricsService.getTeamCount()).isEqualTo(2);
    }

    @Test
    void getTeamLogins_whenGivenBothAStartAndEndDate_passesDatesToRepository() {
        var teamBuilder = new Team().toBuilder();
        teamRepository.save(teamBuilder.lastLoginDate(LocalDate.now()).uri("something").build());
        teamRepository.save(teamBuilder.lastLoginDate(LocalDate.now().minus(Period.ofMonths(4))).uri("somethingelse").build());
        assertThat(metricsService.getActiveTeams()).isEqualTo(1);
    }

    @Test
    public void getFeedbackCount_ReturnsAmountOfFeedbackSubmitted() {
        feedbackRepository.saveAll(List.of(
            Feedback.builder().stars(5).build(),
            Feedback.builder().stars(5).build()
        ));
        assertThat(metricsService.getFeedbackCount()).isEqualTo(2);
    }

    @Test
    public void getAverageRating_ReturnsAverageOfFeedbackStars() {
        feedbackRepository.saveAll(List.of(
                Feedback.builder().stars(2).build(),
                Feedback.builder().stars(4).build()
        ));
        assertThat(metricsService.getAverageRating()).isEqualTo(3.0);
    }

    @Test
    public void getAverageRating_WithNoFeedback_ReturnsZero() {
        assertThat(metricsService.getAverageRating()).isEqualTo(0.0);
    }
}