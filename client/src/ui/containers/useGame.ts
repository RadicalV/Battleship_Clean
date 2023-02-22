import { useState } from "react";
import ViewGame from "controllers/model/ViewGame";
import { gameController } from "config";

export function useGame() {
  const [game, setGame] = useState<ViewGame | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);

  const handleClick = () => {
    if (!id) return;
    gameController.getGame(id).subscribe(setGame);
  };

  return { game, setId, handleClick };
}
