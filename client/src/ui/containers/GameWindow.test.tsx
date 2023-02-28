import React from "react";
import GameWindow from "./GameWindow";
import { render, screen } from "@testing-library/react";
import { ViewBoard } from "../../controllers/model";

describe("Game window container", () => {
  it("renders game board and game stats", () => {
    const board = new ViewBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    render(<GameWindow board={board} setGame={jest.fn} gameId={"123456"} />);

    expect(screen.getByTestId("game-board")).toBeInTheDocument();
    expect(screen.getByTestId("game-stats")).toBeInTheDocument();
  });
});

jest.mock("./GameBoard", () => () => <div data-testid="game-board" />);

jest.mock("./GameStats", () => () => <div data-testid="game-stats" />);
