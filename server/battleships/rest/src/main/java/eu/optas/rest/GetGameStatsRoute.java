package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.use_cases.api.GetGameStatsUC;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

public class GetGameStatsRoute implements Handler {
    private final GetGameStatsUC getGameStatsUC;
    private final Boundary2RestConverter boundary2RestConverter;

    public GetGameStatsRoute(GetGameStatsUC getGameStatsUC, Boundary2RestConverter boundary2RestConverter) {
        this.getGameStatsUC = getGameStatsUC;
        this.boundary2RestConverter = boundary2RestConverter;
    }

    @Override
    public void handle(@NotNull Context ctx) {
        BoundaryGameStats boundaryGameStats = getGameStatsUC.getGameStats(ctx.pathParam("id"));
        if (boundaryGameStats != null)
            ctx.json(boundary2RestConverter.convertGameStats(boundaryGameStats));
        else {
            ctx.json("{\n \"message\": \"Game not found!\"\n}");
            ctx.status(404);
        }
    }
}
