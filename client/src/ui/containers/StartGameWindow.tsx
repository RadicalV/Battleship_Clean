import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useStyles } from "ui/styles";
import { useStartGame } from "./useStartGame";
import { ViewGame } from "controllers/model";

interface Props {
  setGame: (game: ViewGame) => void;
}

const StartGameWindow = ({ setGame }: Props) => {
  const { handleClick } = useStartGame(setGame);
  const { classes } = useStyles();

  return (
    <Box className={classes.mainWrapper}>
      <Typography className={classes.title} variant="h1" component="h1">
        BattleShips
      </Typography>
      <Button
        className={classes.startGameBtn}
        variant="outlined"
        onClick={handleClick}
      >
        Start Game
      </Button>
    </Box>
  );
};

export default StartGameWindow;
