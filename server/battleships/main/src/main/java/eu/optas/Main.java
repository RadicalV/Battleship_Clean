package eu.optas;

import eu.optas.gateway.api.GameGateway;
import eu.optas.gateway.implementation.InMemoryGameGateway;
import eu.optas.rest.StartGameRoute;
import eu.optas.use_cases.api.StartGameUC;
import eu.optas.use_cases.implementation.StartGameInteractor;
import io.javalin.Javalin;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Main {
    private final static Logger LOGGER = LogManager.getLogger(Main.class);

    public static void main(String[] args) {
        GameGateway gameGateway = new InMemoryGameGateway();
        StartGameUC startGameUC = new StartGameInteractor(gameGateway);
        StartGameRoute startGameRoute = new StartGameRoute(startGameUC);

        Javalin app = Javalin.create().start(3000);

        app.get("/startGame", startGameRoute::startGame);
    }
}