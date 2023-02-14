import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getGameController } from "config";

const GetGame = () => {
  const [game, setGame] = useState<{ id: string; isActive: boolean }>();
  const [id, setId] = useState("");

  const handleClick = () => {
    const result = getGameController.getGame(id);
    setGame(result);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        flexDirection: "column",
        gap: 4,
      }}
    >
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
export default GetGame;
