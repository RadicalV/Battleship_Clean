import Ship from "domain/Ship";
import BoundaryShip from "boundary/model/BoundaryShip";
import { Converter } from "utils/Converter";

export class ShipD2BConverter extends Converter<Ship, BoundaryShip> {
  convert(ship: Ship): BoundaryShip {
    return new BoundaryShip(
      ship.length,
      ship.coordinates,
      ship.hits,
      ship.destroyed
    );
  }
}
