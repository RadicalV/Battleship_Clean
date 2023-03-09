package eu.optas.use_cases.implementation;

import eu.optas.domain.Game;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.GetGameUC;

public class GetGameInteractor implements GetGameUC {
    private final GameGateway gameGateway;
    private final GameD2BConverter gameD2BConverter;

    public GetGameInteractor(GameGateway gameGateway, GameD2BConverter gameD2BConverter) {
        this.gameGateway = gameGateway;
        this.gameD2BConverter = gameD2BConverter;
    }

    @Override
    public BoundaryGame getGame(String id) {
        Game game = gameGateway.getGame(id);
        return game != null ? gameD2BConverter.convert(game) : null;
    }
}
