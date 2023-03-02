import { BoundaryGame, BoundaryBoard } from "boundary/model/index";
import { ViewGame, ViewBoard } from "controllers/model/index";
import { GameB2VConverter } from "./GameB2VConverter";
import { BoardB2VConverter } from "./BoardB2VConverter";
import { mock, MockProxy } from "jest-mock-extended";
import { IN_PROGRESS } from "utils/Constants";

describe(GameB2VConverter, () => {
  let gameConverter: GameB2VConverter;
  let boardConverter: MockProxy<BoardB2VConverter>;

  beforeEach(() => {
    boardConverter = mock<BoardB2VConverter>();
    gameConverter = new GameB2VConverter(boardConverter);
  });

  it("Converts BoundaryGame model to ViewGame model", () => {
    const boundaryBoard = mock<BoundaryBoard>();
    const viewBoard = mock<ViewBoard>();
    const inputGame: BoundaryGame = new BoundaryGame(
      "123",
      IN_PROGRESS,
      boundaryBoard
    );
    const expectedGame: ViewGame = new ViewGame("123", IN_PROGRESS, viewBoard);

    boardConverter.convert.calledWith(boundaryBoard).mockReturnValue(viewBoard);

    const convertedGame = gameConverter.convert(inputGame);

    expect(convertedGame.id).toEqual(expectedGame.id);
    expect(convertedGame.state).toEqual(expectedGame.state);
    expect(convertedGame.board).toEqual(expectedGame.board);
  });
});
