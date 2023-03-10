package eu.optas;

import eu.optas.gateway.api.GameGateway;
import eu.optas.gateway.implementation.InMemoryGameGateway;
import eu.optas.rest.*;
import eu.optas.use_cases.api.GetGameStatsUC;
import eu.optas.use_cases.api.GetGameUC;
import eu.optas.use_cases.api.StartGameUC;
import eu.optas.use_cases.implementation.*;
import io.javalin.Javalin;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Main {
    private final static Logger LOGGER = LogManager.getLogger(Main.class);

    public static void main(String[] args) {
        GameGateway gameGateway = new InMemoryGameGateway();

        ShipD2BConverter shipD2BConverter = new ShipD2BConverter();
        BoardD2BConverter boardD2BConverter = new BoardD2BConverter(shipD2BConverter);
        GameD2BConverter gameD2BConverter = new GameD2BConverter(boardD2BConverter);
        GameB2RConverter gameB2RConverter = new GameB2RConverter();
        GameStatsB2RConverter gameStatsB2RConverter = new GameStatsB2RConverter();

        StartGameUC startGameUC = new StartGameInteractor(gameGateway, gameD2BConverter);
        GetGameUC getGameUC = new GetGameInteractor(gameGateway, gameD2BConverter);
        GetGameStatsUC getGameStatsUC = new GetGameStatsInteractor(gameGateway);

        Javalin app = Javalin.create().start(3000);

        app.post("/games", new StartGameRoute(startGameUC, gameB2RConverter));
        app.get("/games/{id}", new GetGameRoute(getGameUC, gameB2RConverter));
        app.get("/games/{id}/stats", new GetGameStatsRoute(getGameStatsUC, gameStatsB2RConverter));
    }
}