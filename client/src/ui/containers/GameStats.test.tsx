import React from "react";
import GameStats from "./GameStats";
import { ViewBoard, ViewGameStats } from "controllers/model/index";
import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

describe("Game stats container", () => {
  it("renders destroyed ships and hits remaining stats", () => {
    jest.mock("./useGameStats", () => () => {
      new ViewGameStats(15, 2);
    });

    render(<GameStats board={mock<ViewBoard>()} gameId="123" />);

    expect(screen.getByTestId("hits-stat")).toBeInTheDocument();
    expect(screen.getByTestId("hits-stat")).toHaveTextContent("25");
    expect(screen.getByTestId("ships-stat")).toBeInTheDocument();
    expect(screen.getByTestId("ships-stat")).toHaveTextContent("0");
  });
});
