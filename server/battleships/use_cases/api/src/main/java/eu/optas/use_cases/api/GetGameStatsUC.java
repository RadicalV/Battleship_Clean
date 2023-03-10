package eu.optas.use_cases.api;

import java.util.Optional;

public interface GetGameStatsUC {
    public Optional<BoundaryGameStats> getGameStats(String id);
}
