package eu.optas.rest;

import eu.optas.use_cases.api.StartGameUC;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

public class StartGameRoute implements Handler {
    private final StartGameUC startGameUC;

    public StartGameRoute(StartGameUC startGameUC) {
        this.startGameUC = startGameUC;
    }

    @Override
    public void handle(@NotNull Context ctx) {
        ctx.json(startGameUC.startGame());
        ctx.status(201);
    }
}
