package eu.optas.rest;

import eu.optas.use_cases.api.StartGameUC;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

public class StartGameRoute implements Handler {
    private final StartGameUC startGameUC;
    private final Boundary2RestConverter boundary2RestConverter;

    public StartGameRoute(StartGameUC startGameUC, Boundary2RestConverter boundary2RestConverter) {
        this.startGameUC = startGameUC;
        this.boundary2RestConverter = boundary2RestConverter;
    }

    @Override
    public void handle(@NotNull Context ctx) {
        RestGame game = boundary2RestConverter.convertGame(startGameUC.startGame());

        ctx.json(game);
        ctx.status(201);
    }
}
