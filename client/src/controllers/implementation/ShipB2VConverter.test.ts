import { BoundaryShip } from "boundary/model/index";
import { ShipB2VConverter } from "./ShipB2VConverter";
import { ViewShip } from "controllers/model/index";

describe(ShipB2VConverter, () => {
  let shipConverter: ShipB2VConverter;

  beforeEach(() => {
    shipConverter = new ShipB2VConverter();
  });

  it("Converts BoundaryShip model to ViewShip model", () => {
    const inputShip = new BoundaryShip(1, [{ x: 2, y: 2 }], 0, false);
    const expectedShip = new ViewShip([{ x: 2, y: 2 }], false);

    const convertedShip = shipConverter.convert(inputShip);

    expect(convertedShip.coordinates).toEqual(expectedShip.coordinates);
    expect(convertedShip.destroyed).toEqual(expectedShip.destroyed);
  });
});
