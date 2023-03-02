import React from "react";
import GameStats from "./GameStats";
import { ViewBoard, ViewGameStats } from "controllers/model/index";
import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

jest.mock("./useGameStats", () => ({
  useGameStats: jest.fn(() => ({ gameStats: new ViewGameStats(15, 2) })),
}));

describe("Game stats container", () => {
  it("renders destroyed ships and hits remaining stats", () => {
    render(<GameStats board={mock<ViewBoard>()} gameId="123" />);

    expect(screen.getByTestId("hits-stat")).toBeInTheDocument();
    expect(screen.getByTestId("hits-stat")).toHaveTextContent("15");
    expect(screen.getByTestId("ships-stat")).toBeInTheDocument();
    expect(screen.getByTestId("ships-stat")).toHaveTextContent("2");
  });
});
