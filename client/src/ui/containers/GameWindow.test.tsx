import React from "react";
import GameWindow from "./GameWindow";
import { render, screen } from "@testing-library/react";
import { ViewBoard, ViewGame } from "controllers/model/index";
import { IN_PROGRESS } from "utils/Constants";

describe("Game window container", () => {
  it("renders game board and game stats", () => {
    const board = new ViewBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    const game = new ViewGame("123", IN_PROGRESS, board);

    render(<GameWindow game={game} setGame={jest.fn} gameId={"123456"} />);

    expect(screen.getByTestId("game-board")).toBeInTheDocument();
    expect(screen.getByTestId("game-stats")).toBeInTheDocument();
  });
});

jest.mock("./GameBoard", () => () => <div data-testid="game-board" />);

jest.mock("./GameStats", () => () => <div data-testid="game-stats" />);
