import GameStorage from "services/api/GameStorage";
import { GameD2BConverter } from "./GameD2BConverter";
import { GetGameInteractor } from "./GetGameInteractor";
import Game from "domain/Game";
import Board from "domain/Board";
import Ship from "domain/Ship";
import BoundaryGame from "boundary/model/BoundaryGame";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import BoundaryShip from "boundary/model/BoundaryShip";
import { mock, MockProxy } from "jest-mock-extended";
import { of } from "rxjs";

describe("Get Game Interactor", () => {
  let gameStorage: MockProxy<GameStorage>;
  let gameD2BConverter: MockProxy<GameD2BConverter>;
  let getGameInteractor: GetGameInteractor;
  const inputId = "123";

  beforeEach(() => {
    gameStorage = mock<GameStorage>();
    gameD2BConverter = mock<GameD2BConverter>();
    getGameInteractor = new GetGameInteractor(gameStorage, gameD2BConverter);
  });

  it("finds game and returns it", (done) => {
    const expectedGame: Game = new Game(
      "123",
      true,
      new Board([[0, 0, 0, 0]], [new Ship(1, [{ x: 1, y: 1 }], 0)])
    );
    const expectedBoundaryGame: BoundaryGame = new BoundaryGame(
      "123",
      true,
      new BoundaryBoard(
        [[0, 0, 0, 0]],
        [new BoundaryShip(1, [{ x: 1, y: 1 }], 0, false)]
      )
    );

    gameStorage.getGame.calledWith(inputId).mockReturnValue(of(expectedGame));
    gameD2BConverter.convert
      .calledWith(expectedGame)
      .mockReturnValue(expectedBoundaryGame);

    getGameInteractor.getGame(inputId).subscribe({
      next: (game) => {
        expect(game).toStrictEqual(expectedBoundaryGame);
        done();
      },
      error: (error) => done(error),
    });
  });
});
