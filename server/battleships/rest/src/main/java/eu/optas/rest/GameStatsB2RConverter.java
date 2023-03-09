package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryGameStats;

public class GameStatsB2RConverter {
    public RestGameStats convertGameStats(BoundaryGameStats boundaryGameStats) {
        return new RestGameStats(boundaryGameStats.getHitsRemaining(), boundaryGameStats.getShipsDestroyed());
    }
}
