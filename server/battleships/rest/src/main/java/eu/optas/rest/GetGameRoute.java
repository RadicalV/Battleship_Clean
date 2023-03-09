package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.GetGameUC;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

public class GetGameRoute implements Handler {
    private final GetGameUC getGameUC;
    private final Boundary2RestConverter boundary2RestConverter;

    public GetGameRoute(GetGameUC getGameUC, Boundary2RestConverter boundary2RestConverter) {
        this.getGameUC = getGameUC;
        this.boundary2RestConverter = boundary2RestConverter;
    }

    @Override
    public void handle(@NotNull Context ctx) {
        BoundaryGame boundaryGame = getGameUC.getGame(ctx.pathParam("id"));
        if (boundaryGame != null)
            ctx.json(boundary2RestConverter.convertGame(boundaryGame));
        else {
            ctx.json("{\n \"message\": \"Game not found!\"\n}");
            ctx.status(404);
        }
    }
}
