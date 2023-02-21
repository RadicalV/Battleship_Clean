import Board from "domain/Board";
import Ship from "domain/Ship";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import { BoardD2BConverter } from "./BoardD2BConverter";
import { ShipD2BConverter } from "./ShipD2BConverter";
import { mock, MockProxy } from "jest-mock-extended";

describe(BoardD2BConverter, () => {
  let boardD2BConverter: BoardD2BConverter;
  let shipD2BConverter: MockProxy<ShipD2BConverter>;

  beforeEach(() => {
    shipD2BConverter = mock<ShipD2BConverter>();
    boardD2BConverter = new BoardD2BConverter(shipD2BConverter);
  });

  it("Converts Board model to BoundaryBoard model", () => {
    const ships: Ship[] = [];
    const inputBoard: Board = new Board([], ships);
    const expectedBoard: BoundaryBoard = new BoundaryBoard([], []);

    shipD2BConverter.convertAll.calledWith(ships).mockReturnValue([]);

    const convertedBoard: BoundaryBoard = boardD2BConverter.convert(inputBoard);

    expect(convertedBoard.grid).toEqual(expectedBoard.grid);
    expect(convertedBoard.ships).toEqual(expectedBoard.ships);
  });
});
