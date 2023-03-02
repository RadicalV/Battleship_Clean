import { Converter } from "utils/Converter";
import { ShotResult } from "domain/index";
import { BoundaryShotResult } from "boundary/model/index";
import { ShipD2BConverter } from "./ShipD2BConverter";

export class ShotResultD2BConverter extends Converter<
  ShotResult,
  BoundaryShotResult
> {
  private shipConverter: ShipD2BConverter;

  constructor(shipConverter: ShipD2BConverter) {
    super();
    this.shipConverter = shipConverter;
  }

  convert(shotResult: ShotResult): BoundaryShotResult {
    return new BoundaryShotResult(
      shotResult.grid,
      shotResult.gameState,
      shotResult.ship ? this.shipConverter.convert(shotResult.ship) : undefined
    );
  }
}
