package eu.optas.rest;

import eu.optas.use_cases.api.StartGameUC;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

public class StartGameRoute implements Handler {
    private final StartGameUC startGameUC;
    private final GameB2RConverter gameB2RConverter;

    public StartGameRoute(StartGameUC startGameUC, GameB2RConverter gameB2RConverter) {
        this.startGameUC = startGameUC;
        this.gameB2RConverter = gameB2RConverter;
    }

    @Override
    public void handle(@NotNull Context ctx) {
        RestGame game = gameB2RConverter.convertGame(startGameUC.startGame());

        ctx.json(game);
        ctx.status(201);
    }
}
