import { GameController } from "controllers/implementation/index";
import { ViewBoard, ViewGame } from "controllers/model/index";
import { useStartGame } from "./useStartGame";
import { mock, MockProxy } from "jest-mock-extended";
import { of } from "rxjs";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import * as config from "config";
import { GameState } from "utils/Constants";

describe("Use Start Game Hook", () => {
  let gameController: MockProxy<GameController>;

  beforeEach(() => {
    gameController = mock<GameController>();
    jest.spyOn(config, "gameController").mockReturnValue(gameController);
  });

  it("creates a game and sets it to state", () => {
    const expectedGame = new ViewGame(
      "123",
      GameState.IN_PROGRESS,
      mock<ViewBoard>()
    );

    gameController.startGame.mockReturnValue(of(expectedGame));

    const setStateMock = jest.fn();
    const { result } = renderHook(() => useStartGame(setStateMock));

    act(() => result.current.handleClick());

    expect(setStateMock).toHaveBeenCalledTimes(1);
  });
});
