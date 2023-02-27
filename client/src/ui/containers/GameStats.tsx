import React from "react";
import { Box } from "@mui/material";
import { useStyles } from "ui/styles";

//TODO make custom hook that gets hits, destroyed ships. Probably new UC

const GameStats = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.gameStatsWrapper}>
      <Box className={classes.statsItem}>
        Hits Remaining: <Box className={classes.statsItemHighlight}>25</Box>
      </Box>
      <Box className={classes.statsItem}>
        Ships Destroyed: <Box className={classes.statsItemHighlight}>10</Box>
      </Box>
    </Box>
  );
};

export default GameStats;
