import { ViewGame, ViewBoard } from "controllers/model/index";
import { gameController } from "config";
import { useSnackbar } from "notistack";
import { useStyles } from "ui/styles";

export function useShoot(setGame: (game: ViewGame) => void, gameId: string) {
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useStyles();

  const handleCellClick = (x: number, y: number) => {
    gameController()
      .shoot(gameId, x, y)
      .subscribe((shotResult) => {
        if (shotResult.ship?.destroyed)
          enqueueSnackbar(
            "You destroyed a ship of length " +
              shotResult.ship.coordinates.length,
            {
              autoHideDuration: 3000,
              anchorOrigin: { horizontal: "right", vertical: "bottom" },
              variant: "info",
              className: `${classes.snackbar}`,
            }
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
