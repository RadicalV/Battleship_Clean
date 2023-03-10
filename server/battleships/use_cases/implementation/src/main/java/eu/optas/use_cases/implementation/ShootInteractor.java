package eu.optas.use_cases.implementation;

import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.use_cases.api.ShootUC;

import java.util.Optional;

public class ShootInteractor implements ShootUC {

    private final GameGateway gameGateway;
    private final ShotResultD2BConverter shotResultD2BConverter;

    public ShootInteractor(GameGateway gameGateway, ShotResultD2BConverter shotResultD2BConverter) {
        this.gameGateway = gameGateway;
        this.shotResultD2BConverter = shotResultD2BConverter;
    }

    @Override
    public Optional<BoundaryShotResult> shoot(String gameId, int x, int y) {
        return Optional.ofNullable(gameGateway.shoot(gameId, x, y)).map(shotResultD2BConverter::convert);
    }
}
