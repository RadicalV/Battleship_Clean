import { GameStatsController } from "controllers/implementation/index";
import { ViewGameStats, ViewBoard } from "controllers/model/index";
import { useGameStats } from "./useGameStats";
import { mock, MockProxy } from "jest-mock-extended";
import { of } from "rxjs";
import { renderHook } from "@testing-library/react";
import * as config from "config";

describe("Use Game Stats Hook", () => {
  let gameStatsController: MockProxy<GameStatsController>;

  beforeEach(() => {
    gameStatsController = mock<GameStatsController>();
    jest
      .spyOn(config, "gameStatsController")
      .mockReturnValue(gameStatsController);
  });

  it("gets game stats", () => {
    const expectedGameStats = new ViewGameStats(15, 5);
    const board = mock<ViewBoard>();
    const id = "13456test";

    gameStatsController.getGameStats
      .calledWith(id)
      .mockReturnValue(of(expectedGameStats));

    const setStateMock = jest.fn();
    const { result } = renderHook(() => useGameStats(id, board, setStateMock));

    expect(result.current.gameStats.hitsRemaining).toEqual(15);
    expect(result.current.gameStats.shipsDestroyed).toEqual(5);
    expect(setStateMock).toHaveBeenCalledTimes(2);
  });
});
