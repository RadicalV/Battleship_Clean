import Board from "domain/Board";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import { BoardD2BConverter } from "./BoardD2BConverter";
import { ShipD2BConverter } from "./ShipD2BConverter";

describe(BoardD2BConverter, () => {
  let converter: BoardD2BConverter;

  beforeEach(() => {
    converter = new BoardD2BConverter(new ShipD2BConverter());
  });

  it("Converts Board model to BoundaryBoard model", () => {
    const inputBoard: Board = new Board([], []);
    const expectedBoard: BoundaryBoard = new BoundaryBoard([], []);

    expect(converter.convert(inputBoard)).toStrictEqual(expectedBoard);
  });
});
