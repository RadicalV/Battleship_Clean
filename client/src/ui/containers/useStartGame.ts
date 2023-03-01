import { gameController } from "config";
import { ViewGame } from "controllers/model/index";

export function useStartGame(setGame: (game: ViewGame) => void) {
  const handleClick = () => {
    gameController().startGame().subscribe(setGame);
  };

  return { handleClick };
}
