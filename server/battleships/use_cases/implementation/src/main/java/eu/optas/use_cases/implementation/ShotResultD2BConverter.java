package eu.optas.use_cases.implementation;

import eu.optas.domain.Ship;
import eu.optas.domain.ShotResult;
import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.utils.Converter;

public class ShotResultD2BConverter extends Converter<ShotResult, BoundaryShotResult> {

    @Override
    public BoundaryShotResult convert(ShotResult shotResult) {
        BoundaryShip boundaryShip = shotResult.getShip()
                .map(this::convertShip)
                .orElse(null);

        return new BoundaryShotResult(shotResult.getGrid(), shotResult.getGameState(), boundaryShip);
    }

    private BoundaryShip convertShip(Ship ship) {
        return new BoundaryShip(ship.getLength(), ship.getCoordinates(), ship.getHits(), ship.isDestroyed());
    }
}
