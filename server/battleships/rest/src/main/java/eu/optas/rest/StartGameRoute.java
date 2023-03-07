package eu.optas.rest;

import eu.optas.use_cases.api.StartGameUC;
import io.javalin.http.Context;

public class StartGameRoute {
    private final StartGameUC startGameUC;

    public StartGameRoute(StartGameUC startGameUC) {
        this.startGameUC = startGameUC;
    }

    public void startGame(Context context) {
        context.result("Start Game Route!");
    }
}
