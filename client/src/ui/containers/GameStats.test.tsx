import React from "react";
import GameStats from "./GameStats";
import { ViewBoard } from "controllers/model";
import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

describe("Game stats container", () => {
  it("renders destroyed ships and hits remaining stats", () => {
    render(<GameStats board={mock<ViewBoard>()} />);

    expect(screen.getByTestId("hits-stat")).toBeInTheDocument();
    expect(screen.getByTestId("hits-stat")).toHaveTextContent("25");
    expect(screen.getByTestId("ships-stat")).toBeInTheDocument();
    expect(screen.getByTestId("ships-stat")).toHaveTextContent("0");
  });
});
