import React from "react";
import { Box } from "@mui/material";
import { useStyles } from "ui/styles";
import { ViewBoard } from "controllers/model";

//TODO make custom hook that gets hits, destroyed ships. Probably new UC

interface Props {
  board: ViewBoard;
}

const GameStats = (props: Props) => {
  const { classes } = useStyles();
  const { board } = props;

  return (
    <Box className={classes.gameStatsWrapper}>
      <Box className={classes.statsItem} data-testid="hits-stat">
        Hits Remaining: <Box className={classes.statsItemHighlight}>25</Box>
      </Box>
      <Box className={classes.statsItem} data-testid="ships-stat">
        Ships Destroyed: <Box className={classes.statsItemHighlight}>0</Box>
      </Box>
    </Box>
  );
};

export default GameStats;
