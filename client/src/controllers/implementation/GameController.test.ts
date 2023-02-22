import { mock, MockProxy } from "jest-mock-extended";
import { GetGameUC } from "boundary/api/GetGameUC";
import { StartGameUC } from "boundary/api/StartGameUC";
import { GameController } from "./GameController";
import { GameB2VConverter } from "./GameB2VConverter";
import { BoardB2VConverter } from "./BoardB2VConverter";
import BoundaryGame from "boundary/model/BoundaryGame";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import ViewGame from "controllers/model/ViewGame";
import ViewBoard from "controllers/model/ViewBoard";
import { of } from "rxjs";

describe("Game Controller", () => {
  let getGameUC: MockProxy<GetGameUC>;
  let startGameUC: MockProxy<StartGameUC>;
  let gameConverter: MockProxy<GameB2VConverter>;
  let boardConverter: MockProxy<BoardB2VConverter>;
  let gameController: GameController;

  const inputId = "123";
  const boundaryBoard = new BoundaryBoard([], []);
  const viewBoard = new ViewBoard([]);
  const expectedBoundaryGame = new BoundaryGame(inputId, true, boundaryBoard);
  const expectedViewGame = new ViewGame(inputId, true, viewBoard);

  beforeEach(() => {
    getGameUC = mock<GetGameUC>();
    startGameUC = mock<StartGameUC>();
    gameConverter = mock<GameB2VConverter>();
    boardConverter = mock<BoardB2VConverter>();
    gameController = new GameController(getGameUC, startGameUC, gameConverter);

    boardConverter.convert.calledWith(boundaryBoard).mockReturnValue(viewBoard);
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
      error: (error) => {
        done(error);
      },
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
