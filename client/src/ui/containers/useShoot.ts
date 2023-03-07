import { ViewGame, ViewBoard } from "controllers/model/index";
import { gameController } from "config";
import { useShowSnackbar } from "./useShowSnackbar";

export function useShoot(setGame: (game: ViewGame) => void, gameId: string) {
  const { showSnackbar } = useShowSnackbar();

  const handleCellClick = (x: number, y: number) => {
    gameController()
      .shoot(gameId, x, y)
      .subscribe((shotResult) => {
        if (shotResult.ship?.destroyed)
          showSnackbar(
            "info",
            "You destroyed a ship of length " +
              shotResult.ship.coordinates.length
          );

        setGame(
          new ViewGame(
            gameId,
            shotResult.gameState,
            new ViewBoard(shotResult.grid)
          )
        );
      });
  };

  return { handleCellClick };
}
