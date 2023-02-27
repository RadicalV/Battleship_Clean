import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useStyles } from "ui/styles";
import { ViewGame } from "controllers/model/index";
import Cell from "ui/components/Cell";
import { useShoot } from "./useShoot";

interface Props {
  grid: number[][];
  setGame: (game: ViewGame) => void;
  gameId: string;
}

const renderCell = (
  x: number,
  y: number,
  cellValue: number,
  handleCellClick: (x: number, y: number) => void
) => (
  <Cell
    key={`y${y}x${x}`}
    gridValue={cellValue}
    onCellClick={() => {
      handleCellClick(x, y);
    }}
  />
);

const mapThroughGrid = (
  grid: number[][],
  handleCellClick: (x: number, y: number) => void
) =>
  grid.map((row, x) =>
    row.map((col, y) => renderCell(x, y, col, handleCellClick))
  );

const GameBoard = (props: Props) => {
  const { grid, setGame, gameId } = props;
  const { classes } = useStyles();

  const { handleCellClick } = useShoot(setGame, gameId);

  return (
    <Box className={classes.boardWrapper}>
      <Typography className={classes.gameTitle} variant="h2" component="h2">
        BattleShips
      </Typography>
      <Box className={classes.gridWrapper}>
        <Grid container spacing={0} className={classes.grid}>
          {mapThroughGrid(grid, handleCellClick)}
        </Grid>
      </Box>
    </Box>
  );
};

export default GameBoard;
