import { Board, Ship } from "domain/index";
import { BoundaryBoard, BoundaryShip } from "boundary/model/";
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
    const ships: Ship[] = [mock<Ship>()];
    const expectedShips: BoundaryShip[] = [mock<BoundaryShip>()];
    const inputBoard: Board = new Board([[0, 0, 0, 0]], ships);
    const expectedBoard: BoundaryBoard = new BoundaryBoard(
      [[0, 0, 0, 0]],
      expectedShips
    );

    shipD2BConverter.convertAll
      .calledWith(ships)
      .mockReturnValue(expectedShips);

    const convertedBoard: BoundaryBoard = boardD2BConverter.convert(inputBoard);

    expect(convertedBoard.grid).toEqual(expectedBoard.grid);
    expect(convertedBoard.ships).toEqual(expectedBoard.ships);
  });
});
