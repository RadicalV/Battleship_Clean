import React from "react";
import { ViewBoard } from "controllers/model";
import GameBoard from "./GameBoard";

interface Props {
  board: ViewBoard;
}

const GameWindow = (props: Props) => {
  const { board } = props;

  return <GameBoard grid={board.grid} />;
};

export default GameWindow;
