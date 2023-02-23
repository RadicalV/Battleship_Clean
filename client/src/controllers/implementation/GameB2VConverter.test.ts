import BoundaryGame from "boundary/model/BoundaryGame";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import BoundaryShip from "boundary/model/BoundaryShip";
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
    const boundaryBoard = new BoundaryBoard(
      [[0, 0, 0, 0, 0]],
      [new BoundaryShip(1, [{ x: 5, y: 5 }], 0, false)]
    );
    const viewBoard = new ViewBoard([[0, 0, 0, 0, 0]]);
    const inputGame: BoundaryGame = new BoundaryGame(
      "123",
      true,
      boundaryBoard
    );
    const expectedGame: ViewGame = new ViewGame("123", true, viewBoard);

    boardConverter.convert.calledWith(boundaryBoard).mockReturnValue(viewBoard);

    const convertedGame = gameConverter.convert(inputGame);

    expect(convertedGame.id).toEqual(expectedGame.id);
    expect(convertedGame.active).toEqual(expectedGame.active);
    expect(convertedGame.board).toEqual(expectedGame.board);
  });
});
