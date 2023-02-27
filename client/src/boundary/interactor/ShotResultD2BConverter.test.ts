import { ShotResult, Ship } from "domain/index";
import { BoundaryShotResult, BoundaryShip } from "boundary/model/index";
import { ShipD2BConverter } from "./ShipD2BConverter";
import { ShotResultD2BConverter } from "./ShotResultD2BConverter";
import { mock, MockProxy } from "jest-mock-extended";

describe(ShotResultD2BConverter, () => {
  let converter: ShotResultD2BConverter;
  let shipConverter: MockProxy<ShipD2BConverter>;

  beforeEach(() => {
    shipConverter = mock<ShipD2BConverter>();
    converter = new ShotResultD2BConverter(shipConverter);
  });

  it("Converts ShotResult model to BoundaryShotResult model when ship is undefined", () => {
    const inputShotResult: ShotResult = new ShotResult([[0, 0, 0, 0]]);
    const expectedShotResult: BoundaryShotResult = new BoundaryShotResult([
      [0, 0, 0, 0],
    ]);

    const shotResult: BoundaryShotResult = converter.convert(inputShotResult);

    expect(shipConverter.convert).toBeCalledTimes(0);
    expect(shotResult.grid).toEqual(expectedShotResult.grid);
    expect(shotResult.ship).toEqual(expectedShotResult.ship);
  });

  it("Converts ShotResult model to BoundaryShotResult model when ship is defined", () => {
    const ship: Ship = mock<Ship>();
    const boundaryShip: BoundaryShip = mock<BoundaryShip>();
    const inputShotResult: ShotResult = new ShotResult([[0, 0, 0, 0]], ship);
    const expectedShotResult: BoundaryShotResult = new BoundaryShotResult(
      [[0, 0, 0, 0]],
      boundaryShip
    );

    shipConverter.convert.calledWith(ship).mockReturnValue(boundaryShip);

    const shotResult: BoundaryShotResult = converter.convert(inputShotResult);

    expect(shotResult.grid).toEqual(expectedShotResult.grid);
    expect(shotResult.ship).toEqual(expectedShotResult.ship);
  });
});
