import Ship from "domain/Ship";
import BoundaryShip from "boundary/model/BoundaryShip";
import { ShipD2BConverter } from "./ShipD2BConverter";

describe("Domain model conversion to boundary model", () => {
  let converter: ShipD2BConverter;

  beforeEach(() => {
    converter = new ShipD2BConverter();
  });

  it("Converts Ship model to BoundaryShip model", () => {
    const inputShip: Ship = new Ship(0, [], 25);
    const boundaryShip: BoundaryShip = new BoundaryShip(0, [], 25, false);

    expect(converter.convert(inputShip)).toStrictEqual(boundaryShip);
  });
});
