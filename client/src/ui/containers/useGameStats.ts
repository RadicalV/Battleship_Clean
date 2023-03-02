import { gameStatsController } from "config";
import { ViewGameStats, ViewBoard } from "controllers/model/index";
import { useEffect, useState } from "react";

export function useGameStats(
  gameId: string,
  board: ViewBoard,
  onStatsUpdate: (destroyedShips: number) => void
) {
  const [gameStats, setGameStats] = useState<ViewGameStats>(
    new ViewGameStats(25, 0)
  );

  useEffect(() => {
    gameStatsController().getGameStats(gameId).subscribe(setGameStats);
    onStatsUpdate(gameStats.shipsDestroyed);
  }, [board, gameId, onStatsUpdate, gameStats.shipsDestroyed]);

  return { gameStats };
}
