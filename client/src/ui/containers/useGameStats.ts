import { gameStatsController } from "config";
import { ViewGameStats } from "controllers/model";

export function useGameStats(setGameStats: (gameStats: ViewGameStats) => void) {
  const getGameStats = (gameId: string) => {
    gameStatsController().getGameStats(gameId).subscribe(setGameStats);
  };

  return { getGameStats };
}
