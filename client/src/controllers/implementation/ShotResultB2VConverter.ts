import { Converter } from "utils/Converter";
import { BoundaryShotResult } from "boundary/model/index";
import { ViewShotResult } from "controllers/model/index";
import { ShipB2VConverter } from "./ShipB2VConverter";

export class ShotResultB2VConverter extends Converter<
  BoundaryShotResult,
  ViewShotResult
> {
  private shipConverter: ShipB2VConverter;

  constructor(shipConverter: ShipB2VConverter) {
    super();
    this.shipConverter = shipConverter;
  }

  convert(shotResult: BoundaryShotResult): ViewShotResult {
    return new ViewShotResult(
      shotResult.grid,
      shotResult.gameState,
      shotResult.ship ? this.shipConverter.convert(shotResult.ship) : undefined
    );
  }
}
