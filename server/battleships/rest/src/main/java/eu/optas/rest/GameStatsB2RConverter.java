package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.utils.Converter;

public class GameStatsB2RConverter extends Converter<BoundaryGameStats, RestGameStats> {
    @Override
    public RestGameStats convert(BoundaryGameStats boundaryGameStats) {
        return new RestGameStats(boundaryGameStats.getHitsRemaining(), boundaryGameStats.getShipsDestroyed());
    }
}
