package eu.optas.use_cases.implementation;

import eu.optas.domain.Game;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.GetGameUC;

import java.util.Optional;

public class GetGameInteractor implements GetGameUC {
    private final GameGateway gameGateway;
    private final GameD2BConverter gameD2BConverter;

    public GetGameInteractor(GameGateway gameGateway, GameD2BConverter gameD2BConverter) {
        this.gameGateway = gameGateway;
        this.gameD2BConverter = gameD2BConverter;
    }

    @Override
    public Optional<BoundaryGame> getGame(String id) {
        Game game = gameGateway.getGame(id);
        return Optional.ofNullable(game).map(gameD2BConverter::convert);
    }
}
