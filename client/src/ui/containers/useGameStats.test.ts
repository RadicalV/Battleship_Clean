import React from "react";
import { GameStatsController } from "controllers/implementation/index";
import { ViewGameStats, ViewBoard } from "controllers/model/index";
import { useGameStats } from "./useGameStats";
import { mock, MockProxy } from "jest-mock-extended";
import { of } from "rxjs";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import * as config from "config";

describe("Use Start Game Hook", () => {
  let gameStatsController: MockProxy<GameStatsController>;

  beforeEach(() => {
    gameStatsController = mock<GameStatsController>();
    jest
      .spyOn(config, "gameStatsController")
      .mockReturnValue(gameStatsController);
  });

  it("creates a game and sets it to state", () => {
    const expectedGameStats = new ViewGameStats(15, 5);
    const board = new ViewBoard([[0, 0, 0]]);
    const id = "13456test";
    gameStatsController.getGameStats
      .calledWith(id)
      .mockReturnValue(of(expectedGameStats));

    const { result } = renderHook(() => useGameStats(id, board));

    expect(result.current.gameStats.hitsRemaining).toEqual(15);
    expect(result.current.gameStats.shipsDestroyed).toEqual(5);
  });
});
