import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import StartGameWindow from "./StartGameWindow";

describe("Start game window container", () => {
  const setStateMock = jest.fn();

  jest.mock("./useStartGame", () => () => setStateMock);

  it("calls hook and sets game state on click", () => {
    render(<StartGameWindow setGame={setStateMock} />);

    fireEvent.click(screen.getByTestId("start-btn"));

    expect(setStateMock).toHaveBeenCalledTimes(1);
  });
});
