package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.utils.Converter;

public class ShotResultB2RConverter extends Converter<BoundaryShotResult, RestShotResult> {
    @Override
    public RestShotResult convert(BoundaryShotResult shotResult) {
        RestShip restShip = shotResult.getShip()
                .map(this::convertShip)
                .orElse(null);

        return new RestShotResult(shotResult.getGrid(), shotResult.getGameState(), restShip);
    }

    private RestShip convertShip(BoundaryShip ship) {
        return new RestShip(ship.getLength(), ship.getCoordinates(), ship.getHits(), ship.isDestroyed());
    }
}
