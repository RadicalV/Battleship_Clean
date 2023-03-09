package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.use_cases.api.GetGameStatsUC;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

import java.util.Map;
import java.util.Optional;

public class GetGameStatsRoute implements Handler {
    private final GetGameStatsUC getGameStatsUC;
    private final GameStatsB2RConverter gameStatsB2RConverter;

    public GetGameStatsRoute(GetGameStatsUC getGameStatsUC, GameStatsB2RConverter gameStatsB2RConverter) {
        this.getGameStatsUC = getGameStatsUC;
        this.gameStatsB2RConverter = gameStatsB2RConverter;
    }

    @Override
    public void handle(@NotNull Context ctx) {
        Optional<BoundaryGameStats> boundaryGameStats = getGameStatsUC.getGameStats(ctx.pathParam("id"));

        boundaryGameStats.ifPresentOrElse(gameStats -> ctx.json(gameStatsB2RConverter.convertGameStats(gameStats)),
                () -> {
                    ctx.json(Map.of("message", "Game not found!"));
                    ctx.status(404);
                });
    }
}
