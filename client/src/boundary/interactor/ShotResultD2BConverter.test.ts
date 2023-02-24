import { ShotResult, Ship } from "domain/index";
import { BoundaryShotResult, BoundaryShip } from "boundary/model/index";
import { ShipD2BConverter } from "./ShipD2BConverter";
import { ShotResultD2BConverter } from "./ShotResultD2BConverter";
import { mock } from "jest-mock-extended";

describe(ShotResultD2BConverter, () => {
  let converter: ShotResultD2BConverter;

  beforeEach(() => {
    converter = new ShotResultD2BConverter(mock<ShipD2BConverter>());
  });

  it("Converts ShotResult model to BoundaryShotResult model", () => {
    const inputShotResult: ShotResult = new ShotResult([[0, 0, 0, 0]]);
    const expectedShotResult: BoundaryShotResult = new BoundaryShotResult([
      [0, 0, 0, 0],
    ]);

    const shotResult: BoundaryShotResult = converter.convert(inputShotResult);

    expect(shotResult.grid).toEqual(expectedShotResult.grid);
    expect(shotResult.ship).toEqual(expectedShotResult.ship);
  });
});
