import React from "react";
import { Box } from "@mui/material";
import { useStyles } from "ui/styles";
import { ViewBoard, ViewGame } from "controllers/model";
import GameBoard from "./GameBoard";
import GameStats from "./GameStats";

interface Props {
  board: ViewBoard;
  setGame: (game: ViewGame) => void;
  gameId: string;
}

const GameWindow = (props: Props) => {
  const { board, setGame, gameId } = props;
  const { classes } = useStyles();

  return (
    <Box className={classes.gameWrapper}>
      <GameBoard grid={board.grid} setGame={setGame} gameId={gameId} />
      <GameStats board={board} />
    </Box>
  );
};

export default GameWindow;
