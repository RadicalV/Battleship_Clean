import { mock, MockProxy } from "jest-mock-extended";
import { GetGameUC } from "boundary/api/GetGameUC";
import { StartGameUC } from "boundary/api/StartGameUC";
import { GameController } from "./GameController";
import { GameB2VConverter } from "./GameB2VConverter";
import { BoardB2VConverter } from "./BoardB2VConverter";
import { BoundaryGame, BoundaryBoard } from "boundary/model/index";
import { ViewGame, ViewBoard } from "controllers/model/index";
import { of } from "rxjs";

describe("Game Controller", () => {
  let getGameUC: MockProxy<GetGameUC>;
  let startGameUC: MockProxy<StartGameUC>;
  let gameConverter: MockProxy<GameB2VConverter>;
  let boardConverter: MockProxy<BoardB2VConverter>;
  let gameController: GameController;

  const inputId = "123";
  const expectedBoundaryGame = new BoundaryGame(
    inputId,
    true,
    mock<BoundaryBoard>()
  );
  const expectedViewGame = new ViewGame(inputId, true, mock<ViewBoard>());

  beforeEach(() => {
    getGameUC = mock<GetGameUC>();
    startGameUC = mock<StartGameUC>();
    gameConverter = mock<GameB2VConverter>();
    boardConverter = mock<BoardB2VConverter>();
    gameController = new GameController(getGameUC, startGameUC, gameConverter);

    gameConverter.convert
      .calledWith(expectedBoundaryGame)
      .mockReturnValue(expectedViewGame);
  });

  it("finds game and returns it", (done) => {
    getGameUC.getGame
      .calledWith(inputId)
      .mockReturnValue(of(expectedBoundaryGame));

    gameController.getGame(inputId).subscribe({
      next: (game) => {
        expect(game.id).toEqual(expectedViewGame.id);
        expect(game.active).toEqual(expectedViewGame.active);
        expect(game.board).toEqual(expectedViewGame.board);
        done();
      },
      error: (error) => done(error),
    });
  });

  it("creates a game and returns it", (done) => {
    startGameUC.startGame
      .calledWith()
      .mockReturnValue(of(expectedBoundaryGame));

    gameController.startGame().subscribe({
      next: (game) => {
        expect(game.id).toEqual(expectedViewGame.id);
        expect(game.active).toEqual(expectedViewGame.active);
        expect(game.board).toEqual(expectedViewGame.board);
        done();
      },
    });
  });
});
