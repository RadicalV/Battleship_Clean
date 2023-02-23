import GameStorage from "services/api/GameStorage";
import { GameD2BConverter } from "./GameD2BConverter";
import { Game, Board } from "domain/index";
import { BoundaryGame, BoundaryBoard } from "boundary/model/index";
import { StartGameInteractor } from "./StartGameInteractor";
import { mock, MockProxy } from "jest-mock-extended";
import { of } from "rxjs";

describe("Start Game Interactor", () => {
  let gameStorage: MockProxy<GameStorage>;
  let gameD2BConverter: MockProxy<GameD2BConverter>;
  let startGameInteractor: StartGameInteractor;
  const gameId = "123";

  beforeEach(() => {
    gameStorage = mock<GameStorage>();
    gameD2BConverter = mock<GameD2BConverter>();
    startGameInteractor = new StartGameInteractor(
      gameStorage,
      gameD2BConverter
    );
  });

  it("creates a game and returns it", (done) => {
    const expectedGame: Game = new Game(gameId, true, mock<Board>());
    const expectedBoundaryGame: BoundaryGame = new BoundaryGame(
      gameId,
      true,
      mock<BoundaryBoard>()
    );

    gameStorage.startGame.mockReturnValue(of(expectedGame));
    gameD2BConverter.convert
      .calledWith(expectedGame)
      .mockReturnValue(expectedBoundaryGame);

    startGameInteractor.startGame().subscribe({
      next: (game) => {
        expect(game).toStrictEqual(expectedBoundaryGame);
        done();
      },
      error: (error) => done(error),
    });
  });
});
