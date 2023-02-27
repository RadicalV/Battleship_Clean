import React, { useState } from "react";
import { ViewGame } from "controllers/model";
import StartGameWindow from "./StartGameWindow";
import GameWindow from "./GameWindow";

const Game = () => {
  const [game, setGame] = useState<ViewGame | undefined>(undefined);

  return game ? (
    <GameWindow board={game.board} setGame={setGame} gameId={game.id} />
  ) : (
    <StartGameWindow setGame={setGame} />
  );
};
export default Game;
