import { Board, Game } from "domain/index";
import { BoundaryBoard, BoundaryGame } from "boundary/model/index";
import { GameD2BConverter } from "./GameD2BConverter";
import { BoardD2BConverter } from "./BoardD2BConverter";
import { mock, MockProxy } from "jest-mock-extended";
import { GameState } from "utils/Constants";

describe(GameD2BConverter, () => {
  let gameConverter: GameD2BConverter;
  let boardConverter: MockProxy<BoardD2BConverter>;

  beforeEach(() => {
    boardConverter = mock<BoardD2BConverter>();
    gameConverter = new GameD2BConverter(boardConverter);
  });

  it("Converts Game model to BoundaryGame model", () => {
    const board = mock<Board>();
    const expectedBoard = mock<BoundaryBoard>();
    const inputGame: Game = new Game(
      "123",
      GameState.IN_PROGRESS,
      board,
      25,
      0
    );

    boardConverter.convert.calledWith(board).mockReturnValue(expectedBoard);

    const expectedGame: BoundaryGame = new BoundaryGame(
      "123",
      GameState.IN_PROGRESS,
      boardConverter.convert(board)
    );

    const convertedGame = gameConverter.convert(inputGame);

    expect(convertedGame.id).toEqual(expectedGame.id);
    expect(convertedGame.state).toEqual(expectedGame.state);
    expect(convertedGame.board).toEqual(expectedGame.board);
  });
});
