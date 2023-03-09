package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.GetGameUC;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

import java.util.Map;
import java.util.Optional;

public class GetGameRoute implements Handler {
    private final GetGameUC getGameUC;
    private final GameB2RConverter gameB2RConverter;

    public GetGameRoute(GetGameUC getGameUC, GameB2RConverter gameB2RConverter) {
        this.getGameUC = getGameUC;
        this.gameB2RConverter = gameB2RConverter;
    }

    @Override
    public void handle(@NotNull Context ctx) {
        Optional<BoundaryGame> boundaryGame = getGameUC.getGame(ctx.pathParam("id"));

        boundaryGame.ifPresentOrElse(game -> ctx.json(gameB2RConverter.convertGame(game)),
                () -> {
                    ctx.json(Map.of("message", "Game not found!"));
                    ctx.status(404);
                });
    }
}
