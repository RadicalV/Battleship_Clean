import React, { useState } from "react";
import ViewGame from "controllers/model/ViewGame";
import StartGameWindow from "./StartGameWindow";
import GameBoard from "./GameBoard";

const Game = () => {
  const [game, setGame] = useState<ViewGame | undefined>(undefined);

  return game ? (
    <GameBoard board={game.board} />
  ) : (
    <StartGameWindow setGame={setGame} />
  );
};
export default Game;
