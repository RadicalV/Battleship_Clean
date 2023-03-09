package eu.optas.use_cases.implementation;

import eu.optas.domain.GameStats;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.use_cases.api.GetGameStatsUC;

public class GetGameStatsInteractor implements GetGameStatsUC {
    private final GameGateway gameGateway;
    private final GameStatsD2BConverter gameStatsD2BConverter;

    public GetGameStatsInteractor(GameGateway gameGateway, GameStatsD2BConverter gameStatsD2BConverter) {
        this.gameGateway = gameGateway;
        this.gameStatsD2BConverter = gameStatsD2BConverter;
    }

    @Override
    public BoundaryGameStats getGameStats(String id) {
        GameStats gameStats = gameGateway.getGameStats(id);
        return gameStats != null ? gameStatsD2BConverter.convert(gameStats) : null;
    }
}
