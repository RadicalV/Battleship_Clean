import GameStorage from "services/api/GameStorage";
import { GameStats } from "domain/index";
import { BoundaryGameStats } from "boundary/model/index";
import { GameStatsD2BConverter } from "./GameStatsD2BConverter";
import { GetGameStatsInteractor } from "./GetGameStatsInteractor";
import { mock, MockProxy } from "jest-mock-extended";
import { of } from "rxjs";

describe("Get Game stats Interactor", () => {
  let gameStorage: MockProxy<GameStorage>;
  let gameStatsD2BConverter: MockProxy<GameStatsD2BConverter>;
  let getGameStatsInteractor: GetGameStatsInteractor;

  beforeEach(() => {
    gameStorage = mock<GameStorage>();
    gameStatsD2BConverter = mock<GameStatsD2BConverter>();
    getGameStatsInteractor = new GetGameStatsInteractor(
      gameStorage,
      gameStatsD2BConverter
    );
  });

  it("returns game stats", (done) => {
    const expectedGameStats: GameStats = new GameStats(25, 0);
    const expectedBoundaryGameStats: BoundaryGameStats = new BoundaryGameStats(
      25,
      0
    );
    const id = "123";

    gameStorage.getGameStats
      .calledWith(id)
      .mockReturnValue(of(expectedGameStats));
    gameStatsD2BConverter.convert
      .calledWith(expectedGameStats)
      .mockReturnValue(expectedBoundaryGameStats);

    getGameStatsInteractor.getGameStats(id).subscribe({
      next: (game) => {
        expect(game).toStrictEqual(expectedBoundaryGameStats);
        done();
      },
      error: (error) => done(error),
    });
  });
});
