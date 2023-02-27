import { Converter } from "utils/Converter";
import { BoundaryShip } from "boundary/model/index";
import { ViewShip } from "controllers/model/index";

export class ShipB2VConverter extends Converter<BoundaryShip, ViewShip> {
  convert(ship: BoundaryShip): ViewShip {
    return new ViewShip(ship.coordinates, ship.destroyed);
  }
}
