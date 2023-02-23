import Ship from "domain/Ship";
import BoundaryShip from "boundary/model/BoundaryShip";
import { ShipD2BConverter } from "./ShipD2BConverter";

describe(ShipD2BConverter, () => {
  let converter: ShipD2BConverter;

  beforeEach(() => {
    converter = new ShipD2BConverter();
  });

  it("Converts Ship model to BoundaryShip model", () => {
    const inputShip: Ship = new Ship(0, [{ x: 1, y: 1 }], 25);
    const expectedShip: BoundaryShip = new BoundaryShip(
      0,
      [{ x: 1, y: 1 }],
      25,
      false
    );

    const convertedShip: BoundaryShip = converter.convert(inputShip);

    expect(convertedShip.hits).toEqual(expectedShip.hits);
    expect(convertedShip.length).toEqual(expectedShip.length);
    expect(convertedShip.destroyed).toEqual(expectedShip.destroyed);
    expect(convertedShip.coordinates).toEqual(expectedShip.coordinates);
  });
});
