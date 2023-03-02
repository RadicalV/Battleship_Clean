import React from "react";
import GameOverModal from "./GameOverModal";
import { IN_PROGRESS, LOST, WON } from "utils/Constants";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Game over modal", () => {
  it("renders game over modal correctly when game state is WON", () => {
    render(
      <GameOverModal setGame={jest.fn} gameState={WON} destroyedShips={5} />
    );

    expect(screen.getByTestId("game-over-modal")).toBeInTheDocument();
    expect(screen.getByTestId("game-over-modal")).toHaveTextContent("You won");
    expect(screen.getByTestId("game-over-modal")).toHaveTextContent(
      "You destroyed 5 ships"
    );
  });
  it("renders game over modal correctly when game state is LOST", () => {
    render(
      <GameOverModal setGame={jest.fn} gameState={LOST} destroyedShips={1} />
    );

    expect(screen.getByTestId("game-over-modal")).toBeInTheDocument();
    expect(screen.getByTestId("game-over-modal")).toHaveTextContent("You lost");
    expect(screen.getByTestId("game-over-modal")).toHaveTextContent(
      "You destroyed 1 ships"
    );
  });
  it("sets game state when button is clicked", () => {
    const setStateMock = jest.fn();
    render(
      <GameOverModal
        setGame={setStateMock}
        gameState={WON}
        destroyedShips={5}
      />
    );

    fireEvent.click(screen.getByTestId("modal-btn"));

    expect(screen.getByTestId("game-over-modal")).toBeInTheDocument();
    expect(setStateMock).toHaveBeenCalledTimes(1);
  });
});
