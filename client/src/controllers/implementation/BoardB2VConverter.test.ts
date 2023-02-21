import BoundaryBoard from "boundary/model/BoundaryBoard";
import ViewBoard from "controllers/model/ViewBoard";
import { BoardB2VConverter } from "./BoardB2VConverter";

describe(BoardB2VConverter, () => {
  let boardConverter: BoardB2VConverter;

  beforeEach(() => {
    boardConverter = new BoardB2VConverter();
  });

  it("Converts BoundaryGame model to ViewGame model", () => {
    const inputBoard = new BoundaryBoard([], []);
    const expectedBoard = new ViewBoard([]);

    const convertedBoard = boardConverter.convert(inputBoard);

    expect(convertedBoard.grid).toEqual(expectedBoard.grid);
  });
});
