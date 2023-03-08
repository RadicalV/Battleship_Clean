package eu.optas.use_cases.implementation;

import eu.optas.domain.Ship;
import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.utils.Converter;

public class ShipD2BConverter extends Converter<Ship, BoundaryShip> {
    @Override
    public BoundaryShip convert(Ship ship) {
        return new BoundaryShip(ship.getLength(), ship.getCoordinates(), ship.getHits(), ship.isDestroyed());
    }
}
