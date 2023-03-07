package eu.optas.use_cases.implementation;

import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.StartGameUC;

public class StartGameInteractor implements StartGameUC {
    private final GameGateway gameGateway;

    public StartGameInteractor(GameGateway gameGateway) {
        this.gameGateway = gameGateway;
    }

    @Override
    public BoundaryGame startGame() {
        return null;
    }
}
