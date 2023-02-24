import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useStyles } from "ui/styles";
import Cell from "ui/components/Cell";

interface Props {
  grid: number[][];
}

const renderCell = (x: number, y: number, cellValue: number) => {
  return (
    <Cell key={`y${y}x${x}`} coordinates={{ x, y }} gridValue={cellValue} />
  );
};

const mapThroughGrid = (grid: number[][]) => {
  return grid.map((row, x) => row.map((col, y) => renderCell(x, y, col)));
};

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
          {mapThroughGrid(grid)}
        </Grid>
      </Box>
    </Box>
  );
};

export default GameBoard;
