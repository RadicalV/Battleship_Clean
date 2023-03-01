import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useStyles } from "ui/styles";
import { ViewBoard, ViewGameStats } from "controllers/model";
import { useGameStats } from "./useGameStats";

interface Props {
  board: ViewBoard;
  gameId: string;
}

const GameStats = (props: Props) => {
  const [gameStats, setGameStats] = useState<ViewGameStats>(
    new ViewGameStats(25, 0)
  );
  const { classes } = useStyles();
  const { board, gameId } = props;
  const { getGameStats } = useGameStats(setGameStats);

  useEffect(() => {
    getGameStats(gameId);
  }, [board, gameId, getGameStats]);

  return (
    <Box className={classes.gameStatsWrapper}>
      <Box className={classes.statsItem} data-testid="hits-stat">
        Hits Remaining:{" "}
        <Box className={classes.statsItemHighlight}>
          {gameStats.hitsRemaining}
        </Box>
      </Box>
      <Box className={classes.statsItem} data-testid="ships-stat">
        Ships Destroyed:{" "}
        <Box className={classes.statsItemHighlight}>
          {gameStats.shipsDestroyed}
        </Box>
      </Box>
    </Box>
  );
};

export default GameStats;
