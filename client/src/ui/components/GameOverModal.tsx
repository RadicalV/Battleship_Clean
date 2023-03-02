import React from "react";
import { ViewGame } from "controllers/model/index";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useStyles } from "ui/styles";
import { IN_PROGRESS } from "utils/Constants";

interface Props {
  setGame: (game: ViewGame | undefined) => void;
  gameState: string;
  destroyedShips: number;
}

const isGameOver = (gameState: string): boolean => {
  return gameState !== IN_PROGRESS;
};

const GameOverModal = (props: Props) => {
  const { setGame, gameState, destroyedShips } = props;
  const { classes, cx, css } = useStyles();

  return (
    <Modal
      open={isGameOver(gameState)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-testid="game-over-modal"
    >
      <Box className={classes.modal}>
        <Typography
          id="modal-modal-title"
          variant="h3"
          component="h2"
          className={cx(css({ color: "red" }), classes.gameTitle)}
        >
          You {gameState}
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="h4"
          component="h2"
          className={classes.modalDescription}
        >
          You destroyed {destroyedShips} ships
        </Typography>
        <Box>
          <Button
            className={classes.modalBtn}
            variant="contained"
            data-testid="modal-btn"
            onClick={() => {
              setGame(undefined);
            }}
          >
            Return to start screen
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GameOverModal;
