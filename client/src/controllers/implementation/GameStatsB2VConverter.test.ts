import { BoundaryGameStats } from "boundary/model/index";
import { ViewGameStats } from "controllers/model/index";
import { GameStatsB2VConverter } from "./GameStatsB2VConverter";

describe(GameStatsB2VConverter, () => {
  let gameStatsConverter: GameStatsB2VConverter;

  beforeEach(() => {
    gameStatsConverter = new GameStatsB2VConverter();
  });

  it("Converts BoundaryShip model to ViewShip model", () => {
    const inputGameStats = new BoundaryGameStats(25, 1);
    const expectedGameStats = new ViewGameStats(25, 1);

    const convertedGameStats = gameStatsConverter.convert(inputGameStats);

    expect(convertedGameStats.hitsRemaining).toEqual(
      expectedGameStats.hitsRemaining
    );
    expect(convertedGameStats.shipsDestroyed).toEqual(
      expectedGameStats.shipsDestroyed
    );
  });
});
