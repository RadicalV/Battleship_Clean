import React from "react";
import { act, render } from "@testing-library/react";
import StartGameWindow from "./StartGameWindow";
import * as hook from "./useStartGame";

describe("Start game window container", () => {
  let setStateMock: () => void;

  beforeEach(() => {
    setStateMock = jest.fn();
  });

  it("calls hook and sets game state on click", () => {
    jest
      .spyOn(hook, "useStartGame")
      .mockReturnValue({ handleClick: setStateMock });

    const renderContainer = render(<StartGameWindow setGame={() => {}} />);

    act(() => renderContainer.getByTestId("start-btn").click());

    expect(setStateMock).toHaveBeenCalledTimes(1);
  });

  it("passes setGame callback to hook", () => {
    const cb = jest.fn();

    const hookSpy = jest.spyOn(hook, "useStartGame");
    hookSpy.mockReturnValue({ handleClick: setStateMock });

    const renderContainer = render(<StartGameWindow setGame={cb} />);

    act(() => renderContainer.getByTestId("start-btn").click());

    expect(hookSpy).toHaveBeenCalledWith(cb);
  });
});
