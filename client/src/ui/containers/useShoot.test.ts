import { GameController } from "controllers/implementation/index";
import { ViewShotResult, ViewShip } from "controllers/model/index";
import { useShoot } from "./useShoot";
import { mock, MockProxy } from "jest-mock-extended";
import { of } from "rxjs";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import * as config from "config";
import { GameState } from "utils/Constants";
import { useSnackbar } from "notistack";

const mockEnqueue = jest.fn();

jest.mock("notistack", () => ({
  ...jest.requireActual("notistack"),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

describe("Use Shoot Hook", () => {
  let gameController: MockProxy<GameController>;

  beforeEach(() => {
    gameController = mock<GameController>();
    jest.spyOn(config, "gameController").mockReturnValue(gameController);
  });

  it("shoots at coordinates and sets a new game state", () => {
    const gameId = "123";
    const coordinateX = 0;
    const coordinateY = 0;
    const expectedShotResult = new ViewShotResult(
      [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      GameState.IN_PROGRESS,
      undefined
    );

    gameController.shoot
      .calledWith(gameId, coordinateX, coordinateY)
      .mockReturnValue(of(expectedShotResult));

    const setStateMock = jest.fn();
    const { result } = renderHook(() => useShoot(setStateMock, gameId));

    act(() => result.current.handleCellClick(coordinateX, coordinateY));

    expect(setStateMock).toHaveBeenCalledTimes(1);
  });
  it("shoots at coordinates, destroys a ship and renders snackbar", () => {
    const gameId = "123";
    const coordinateX = 0;
    const coordinateY = 0;
    const expectedShotResult = new ViewShotResult(
      [
        [3, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      GameState.IN_PROGRESS,
      new ViewShip([], true)
    );

    gameController.shoot
      .calledWith(gameId, coordinateX, coordinateY)
      .mockReturnValue(of(expectedShotResult));

    const setStateMock = jest.fn();
    const { result } = renderHook(() => useShoot(setStateMock, gameId));

    act(() => result.current.handleCellClick(coordinateX, coordinateY));

    expect(useSnackbar().enqueueSnackbar).toHaveBeenCalledTimes(1);
  });
});
