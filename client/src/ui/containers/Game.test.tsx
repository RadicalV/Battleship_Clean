import React from "react";
import { render, screen } from "@testing-library/react";
import Game from "./Game";
import { ViewBoard, ViewGame } from "controllers/model/index";
import { mock } from "jest-mock-extended";
import { IN_PROGRESS } from "utils/Constants";

describe("Game container", () => {
  it("renders start game window when game is undefined", () => {
    render(<Game />);

    expect(screen.getByTestId("start-game-window")).toBeInTheDocument();
  });

  it("renders game window when game is defined", () => {
    const game = new ViewGame("123", IN_PROGRESS, mock<ViewBoard>());
    const useStateMock: any = () => [game, jest.fn()];

    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    render(<Game />);

    expect(screen.getByTestId("game-window")).toBeInTheDocument();
  });
});

jest.mock("./StartGameWindow", () => () => (
  <div data-testid="start-game-window" />
));

jest.mock("./GameWindow", () => () => <div data-testid="game-window" />);
