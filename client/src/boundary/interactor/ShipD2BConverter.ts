import Ship from "domain/Ship";
import BoundaryShip from "boundary/model/BoundaryShip";

export class ShipD2BConverter {
  convert(ship: Ship): BoundaryShip {
    return new BoundaryShip(
      ship.length,
      ship.coordinates,
      ship.hits,
      ship.destroyed
    );
  }
}
