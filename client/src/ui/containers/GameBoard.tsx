import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useStyles } from "ui/styles";
import Cell from "ui/components/Cell";

interface Props {
  grid: number[][];
}

const GameBoard = (props: Props) => {
  const { grid } = props;
  const { classes } = useStyles();
  return (
    <Box className={classes.boardWrapper}>
      <Typography className={classes.gameTitle} variant="h2" component="h2">
        BattleShips
      </Typography>
      <Box className={classes.gridWrapper}>
        <Grid container spacing={0} className={classes.grid}>
          {grid.map((row, x) => {
            return row.map((col, y) => {
              return (
                <Cell
                  key={`y${y}x${x}`}
                  coordinates={{ x, y }}
                  gridValue={col}
                />
              );
            });
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default GameBoard;
