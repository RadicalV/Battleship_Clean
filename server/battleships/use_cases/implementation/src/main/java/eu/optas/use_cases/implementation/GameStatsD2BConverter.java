package eu.optas.use_cases.implementation;

import eu.optas.domain.GameStats;
import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.utils.Converter;

public class GameStatsD2BConverter extends Converter<GameStats, BoundaryGameStats> {
    @Override
    public BoundaryGameStats convert(GameStats gameStats) {
        return new BoundaryGameStats(gameStats.getHitsRemaining(), gameStats.getShipsDestroyed());
    }
}
