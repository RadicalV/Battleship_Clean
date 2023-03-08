package eu.optas.use_cases.implementation;

import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.StartGameUC;

public class StartGameInteractor implements StartGameUC {
    private final GameGateway gameGateway;
    private final GameD2BConverter gameD2BConverter;

    public StartGameInteractor(GameGateway gameGateway, GameD2BConverter gameD2BConverter) {
        this.gameGateway = gameGateway;
        this.gameD2BConverter = gameD2BConverter;
    }

    @Override
    public BoundaryGame startGame() {
        return gameD2BConverter.convert(gameGateway.createGame());
    }
}
