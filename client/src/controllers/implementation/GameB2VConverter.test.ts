import BoundaryGame from "boundary/model/BoundaryGame";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import ViewGame from "controllers/model/ViewGame";
import ViewBoard from "controllers/model/ViewBoard";
import { GameB2VConverter } from "./GameB2VConverter";
import { BoardB2VConverter } from "./BoardB2VConverter";
import { mock, MockProxy } from "jest-mock-extended";

describe(GameB2VConverter, () => {
  let gameConverter: GameB2VConverter;
  let boardConverter: MockProxy<BoardB2VConverter>;

  beforeEach(() => {
    boardConverter = mock<BoardB2VConverter>();
    gameConverter = new GameB2VConverter(boardConverter);
  });

  it("Converts BoundaryGame model to ViewGame model", () => {
    const boundaryBoard = new BoundaryBoard([], []);
    const viewBoard = new ViewBoard([]);
    const inputGame: BoundaryGame = new BoundaryGame(
      "123",
      true,
      boundaryBoard
    );
    const expectedGame: ViewGame = new ViewGame("123", true, viewBoard);

    boardConverter.convert.calledWith(boundaryBoard).mockReturnValue(viewBoard);

    const convertedGame = gameConverter.convert(inputGame);

    expect(convertedGame.id).toEqual(expectedGame.id);
    expect(convertedGame.isActive).toEqual(expectedGame.isActive);
    expect(convertedGame.board).toEqual(expectedGame.board);
  });
});
