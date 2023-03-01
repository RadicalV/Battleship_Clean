import GameStorage from "services/api/GameStorage";
import { GameD2BConverter } from "./GameD2BConverter";
import { GetGameInteractor } from "./GetGameInteractor";
import { Game, Board } from "domain/index";
import { BoundaryGame, BoundaryBoard } from "boundary/model/index";
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
    const expectedGame: Game = new Game("123", true, mock<Board>(), 25, 0);
    const expectedBoundaryGame: BoundaryGame = new BoundaryGame(
      "123",
      true,
      mock<BoundaryBoard>()
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
