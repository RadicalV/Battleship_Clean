import React from "react";
import { Box } from "@mui/material";
import { useStyles } from "ui/styles";
import { ViewBoard } from "controllers/model";
import { useGameStats } from "./useGameStats";

interface Props {
  board: ViewBoard;
  gameId: string;
}

const GameStats = (props: Props) => {
  const { classes } = useStyles();
  const { board, gameId } = props;
  const { gameStats } = useGameStats(gameId, board);

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
