import { Board } from "domain/index";
import { BoundaryBoard } from "boundary/model/index";
import { Converter } from "utils/Converter";
import { ShipD2BConverter } from "./ShipD2BConverter";

export class BoardD2BConverter extends Converter<Board, BoundaryBoard> {
  private shipD2BConverter: ShipD2BConverter;

  constructor(shipConverter: ShipD2BConverter) {
    super();
    this.shipD2BConverter = shipConverter;
  }

  convert(board: Board): BoundaryBoard {
    return new BoundaryBoard(
      board.grid,
      this.shipD2BConverter.convertAll(board.ships)
    );
  }
}
