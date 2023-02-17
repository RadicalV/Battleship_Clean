import { useState } from "react";
import { ViewGame } from "controllers/model/ViewGame";
import { getGameController } from "config";

export function useGetGame() {
  const [game, setGame] = useState<ViewGame | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);

  const handleClick = () => {
    if (!id) return;
    const result = getGameController.getGame(id);
    setGame(result);
  };

  return { game, setId, handleClick };
}
