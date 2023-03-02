import React, { useState } from "react";
import { Box } from "@mui/material";
import { useStyles } from "ui/styles";
import { ViewGame } from "controllers/model";
import GameBoard from "./GameBoard";
import GameStats from "./GameStats";
import GameOverModal from "ui/components/GameOverModal";

interface Props {
  game: ViewGame;
  setGame: (game: ViewGame | undefined) => void;
  gameId: string;
}

const GameWindow = (props: Props) => {
  const [destroyedShips, setDestroyedShips] = useState(0);
  const { game, setGame, gameId } = props;
  const { classes } = useStyles();

  return (
    <Box className={classes.gameWrapper}>
      <GameBoard grid={game.board.grid} setGame={setGame} gameId={gameId} />
      <GameStats
        board={game.board}
        gameId={gameId}
        onStatsUpdate={setDestroyedShips}
      />
      <GameOverModal
        setGame={setGame}
        gameState={game.state}
        destroyedShips={destroyedShips}
      />
    </Box>
  );
};

export default GameWindow;
