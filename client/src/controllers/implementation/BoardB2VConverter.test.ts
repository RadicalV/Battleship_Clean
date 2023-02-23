import { BoundaryBoard, BoundaryShip } from "boundary/model/index";
import { ViewBoard } from "controllers/model/index";
import { BoardB2VConverter } from "./BoardB2VConverter";

describe(BoardB2VConverter, () => {
  let boardConverter: BoardB2VConverter;

  beforeEach(() => {
    boardConverter = new BoardB2VConverter();
  });

  it("Converts BoundaryGame model to ViewGame model", () => {
    const inputBoard = new BoundaryBoard(
      [[0, 0, 0, 0, 0]],
      [new BoundaryShip(1, [{ x: 5, y: 5 }], 0, false)]
    );
    const expectedBoard = new ViewBoard([[0, 0, 0, 0, 0]]);

    const convertedBoard = boardConverter.convert(inputBoard);

    expect(convertedBoard.grid).toEqual(expectedBoard.grid);
  });
});
