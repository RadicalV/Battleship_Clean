package eu.optas;

import eu.optas.gateway.api.GameGateway;
import eu.optas.gateway.implementation.InMemoryGameGateway;
import eu.optas.rest.StartGameRoute;
import eu.optas.use_cases.api.StartGameUC;
import eu.optas.use_cases.implementation.BoardD2BConverter;
import eu.optas.use_cases.implementation.GameD2BConverter;
import eu.optas.use_cases.implementation.ShipD2BConverter;
import eu.optas.use_cases.implementation.StartGameInteractor;
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

        StartGameUC startGameUC = new StartGameInteractor(gameGateway, gameD2BConverter);

        Javalin app = Javalin.create().start(3000);

        app.post("/games", new StartGameRoute(startGameUC));
    }
}