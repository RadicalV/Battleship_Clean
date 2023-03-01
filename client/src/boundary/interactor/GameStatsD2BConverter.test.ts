import { GameStatsD2BConverter } from "./GameStatsD2BConverter";
import { GameStats } from "domain/index";
import { BoundaryGameStats } from "boundary/model/index";

describe(GameStatsD2BConverter, () => {
  let converter: GameStatsD2BConverter;

  beforeEach(() => {
    converter = new GameStatsD2BConverter();
  });

  it("Converts gameStats model to BoundaryGameStats model", () => {
    const inputGameStats: GameStats = new GameStats(25, 0);
    const expectedGameStats: BoundaryGameStats = new BoundaryGameStats(25, 0);

    const convertedShip: BoundaryGameStats = converter.convert(inputGameStats);

    expect(convertedShip.hitsRemaining).toEqual(
      expectedGameStats.hitsRemaining
    );
    expect(convertedShip.shipsDestroyed).toEqual(
      expectedGameStats.shipsDestroyed
    );
  });
});
