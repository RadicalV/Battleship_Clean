import { useState } from "react";
import { ViewGame } from "controllers/model/ViewGame";
import { gameController } from "config";

export function useGame() {
  const [game, setGame] = useState<ViewGame | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);

  const handleClick = () => {
    if (!id) return;
    const result = gameController.getGame(id);
    setGame(result);
  };

  return { game, setId, handleClick };
}