import { Converter } from "utils/Converter";
import { GameStats } from "domain/index";
import { BoundaryGameStats } from "boundary/model/index";

export class GameStatsD2BConverter extends Converter<
  GameStats,
  BoundaryGameStats
> {
  convert(gameStats: GameStats): BoundaryGameStats {
    return new BoundaryGameStats(
      gameStats.hitsRemaining,
      gameStats.shipsDestroyed
    );
  }
}
