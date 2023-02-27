import { ViewGame, ViewBoard } from "controllers/model/index";
import { gameController } from "config";

export function useShoot(setGame: (game: ViewGame) => void, gameId: string) {
  const handleCellClick = (x: number, y: number) => {
    gameController.shoot(gameId, x, y).subscribe((shotResult) => {
      if (shotResult.ship?.destroyed) {
        console.log(
          "Ship destroyed of length: " + shotResult.ship.coordinates.length
        );
      }

      setGame(new ViewGame(gameId, true, new ViewBoard(shotResult.grid)));
    });
  };

  return { handleCellClick };
}
