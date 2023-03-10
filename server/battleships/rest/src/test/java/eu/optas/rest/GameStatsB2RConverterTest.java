package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryGameStats;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class GameStatsB2RConverterTest {

    @Test
    void convertGameStats() {
        BoundaryGameStats inputGameStats = new BoundaryGameStats(25, 5);
        GameStatsB2RConverter gameStatsB2RConverter = new GameStatsB2RConverter();

        RestGameStats convertedGameStats = gameStatsB2RConverter.convert(inputGameStats);

        assertThat(convertedGameStats).usingRecursiveComparison().isEqualTo(inputGameStats);
    }
}