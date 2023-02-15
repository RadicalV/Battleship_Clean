import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ViewGame } from "controllers/model/ViewGame";
import { getGameController } from "config";
import { useStyles } from "ui/styles";

const Game = () => {
  const [game, setGame] = useState<ViewGame | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);

  const handleClick = () => {
    if (!id) return;
    const result = getGameController.getGame(id);
    setGame(result);
  };

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
          {game.id} {game.isActive.toString()}
        </Typography>
      )}
    </Box>
  );
};
export default Game;
