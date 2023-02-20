import Board from "domain/Board";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import BoundaryShip from "boundary/model/BoundaryShip";
import { ShipD2BConverter } from "./ShipD2BConverter";

export class BoardD2BConverter {
  private shipD2BConverter: ShipD2BConverter;

  constructor(shipConverter: ShipD2BConverter) {
    this.shipD2BConverter = shipConverter;
  }

  convert(board: Board): BoundaryBoard {
    const ships: BoundaryShip[] = board.ships.map((ship) => {
      return this.shipD2BConverter.convert(ship);
    });

    return new BoundaryBoard(board.grid, ships);
  }
}
