import { mock, MockProxy } from "jest-mock-extended";
import { GetGameStatsUC } from "boundary/api/GetGameStatsUC";
import { GameStatsController, GameStatsB2VConverter } from "./index";
import { BoundaryGameStats } from "boundary/model/index";
import { ViewGameStats } from "controllers/model/index";
import { of } from "rxjs";

describe("Game Controller", () => {
  let getGameStatsUC: MockProxy<GetGameStatsUC>;
  let gameStatsConverter: MockProxy<GameStatsB2VConverter>;
  let gameController: GameStatsController;

  beforeEach(() => {
    getGameStatsUC = mock<GetGameStatsUC>();
    gameStatsConverter = mock<GameStatsB2VConverter>();
    gameController = new GameStatsController(
      getGameStatsUC,
      gameStatsConverter
    );
  });

  it("returns game stats", (done) => {
    const inputId = "123";
    const expectedBoundaryGameStats = new BoundaryGameStats(25, 5);
    const expectedViewGameStats = new ViewGameStats(25, 5);

    gameStatsConverter.convert
      .calledWith(expectedBoundaryGameStats)
      .mockReturnValue(expectedViewGameStats);

    getGameStatsUC.getGameStats
      .calledWith(inputId)
      .mockReturnValue(of(expectedBoundaryGameStats));

    gameController.getGameStats(inputId).subscribe({
      next: (gameStats) => {
        expect(gameStats.hitsRemaining).toEqual(
          expectedViewGameStats.hitsRemaining
        );
        expect(gameStats.shipsDestroyed).toEqual(
          expectedViewGameStats.shipsDestroyed
        );
        done();
      },
    });
  });
});
