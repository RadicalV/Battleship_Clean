import { Converter } from "utils/Converter";
import { BoundaryGameStats } from "boundary/model/index";
import { ViewGameStats } from "controllers/model/index";

export class GameStatsB2VConverter extends Converter<
  BoundaryGameStats,
  ViewGameStats
> {
  convert(gameStats: BoundaryGameStats): ViewGameStats {
    return new ViewGameStats(gameStats.hitsRemaining, gameStats.shipsDestroyed);
  }
}
