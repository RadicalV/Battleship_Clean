import React from "react";
import { render, screen } from "@testing-library/react";
import GameBoard from "./GameBoard";

const mockShowSnackbar = jest.fn();

jest.mock("./useShowSnackbar", () => ({
  useShowSnackbar: () => ({ showSnackbar: mockShowSnackbar }),
}));

describe("Game board container", () => {
  it("renders game board correctly", () => {
    const grid = [[1, 2, 3]];
    render(<GameBoard setGame={jest.fn} gameId="123456" grid={grid} />);

    expect(screen.getByTestId("grid")).toBeInTheDocument();
    expect(screen.getByTestId("grid")).toContainElement(
      screen.getByTestId("cell-item00")
    );
    expect(screen.getByTestId("grid")).toContainElement(
      screen.getByTestId("cell-item01")
    );
    expect(screen.getByTestId("grid")).toContainElement(
      screen.getByTestId("cell-item02")
    );
  });
});
