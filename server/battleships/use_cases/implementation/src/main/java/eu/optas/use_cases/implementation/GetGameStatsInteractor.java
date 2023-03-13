package eu.optas.use_cases.implementation;

import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.use_cases.api.GetGameStatsUC;

import java.util.Optional;

public class GetGameStatsInteractor implements GetGameStatsUC {
    private final GameGateway gameGateway;

    public GetGameStatsInteractor(GameGateway gameGateway) {
        this.gameGateway = gameGateway;
    }

    @Override
    public Optional<BoundaryGameStats> getGameStats(String id) {
        return gameGateway.getGame(id)
                .map(game -> new BoundaryGameStats(game.getHitsRemaining(), game.getShipsDestroyed()));
    }
}
