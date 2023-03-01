import { gameStatsController } from "config";
import { ViewGameStats, ViewBoard } from "controllers/model/index";
import { useEffect, useState } from "react";

export function useGameStats(gameId: string, board: ViewBoard) {
  const [gameStats, setGameStats] = useState<ViewGameStats>(
    new ViewGameStats(25, 0)
  );

  useEffect(() => {
    gameStatsController().getGameStats(gameId).subscribe(setGameStats);
  }, [board, gameId]);

  return { gameStats };
}
