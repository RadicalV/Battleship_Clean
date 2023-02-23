import React from "react";
import { Box } from "@mui/material";
import { useStyles } from "ui/styles";
import { ViewBoard } from "controllers/model";

interface Props {
  board: ViewBoard;
}

const GameBoard = (props: Props) => {
  const { board } = props;
  const { classes } = useStyles();

  return (
    <Box className={classes.mainWrapper}>
      Game board goes here {board.grid.length}
    </Box>
  );
};

export default GameBoard;
