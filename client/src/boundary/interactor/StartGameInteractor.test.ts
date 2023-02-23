import GameStorage from "services/api/GameStorage";
import { GameD2BConverter } from "./GameD2BConverter";
import Game from "domain/Game";
import Board from "domain/Board";
import Ship from "domain/Ship";
import BoundaryGame from "boundary/model/BoundaryGame";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import BoundaryShip from "boundary/model/BoundaryShip";
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
    const expectedGame: Game = new Game(
      gameId,
      true,
      new Board([[0, 0, 0]], [new Ship(1, [{ x: 1, y: 1 }], 0)])
    );
    const expectedBoundaryGame: BoundaryGame = new BoundaryGame(
      gameId,
      true,
      new BoundaryBoard(
        [[0, 0, 0]],
        [new BoundaryShip(1, [{ x: 1, y: 1 }], 0, false)]
      )
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
