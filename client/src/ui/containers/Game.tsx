import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useStyles } from "ui/styles";
import { useGame } from "./useGame";

const Game = () => {
  const { game, setId, handleClick } = useGame();

  const { classes } = useStyles();

  return (
    <Box className={classes.mainWrapper}>
      <Typography variant="h1" component="h1">
        Get active game
      </Typography>
      <TextField
        variant="outlined"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <Button
        variant="outlined"
        size="large"
        sx={{ fontSize: "2.5rem" }}
        onClick={handleClick}
      >
        Get game
      </Button>
      {game && (
        <Typography>
          {game.id} {game.active.toString()}
        </Typography>
      )}
    </Box>
  );
};
export default Game;
