package eu.optas.use_cases.implementation;

import eu.optas.domain.GameStats;
import eu.optas.use_cases.api.BoundaryGameStats;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class GameStatsD2BConverterTest {

    @Test
    void convert() {
        GameStats inputGameStats = new GameStats(25, 0);
        BoundaryGameStats expectedGameStats = new BoundaryGameStats(25, 0);

        GameStatsD2BConverter gameStatsD2BConverter = new GameStatsD2BConverter();

        BoundaryGameStats convertedGameStats = gameStatsD2BConverter.convert(inputGameStats);

        assertThat(convertedGameStats).usingRecursiveComparison().isEqualTo(expectedGameStats);
    }
}