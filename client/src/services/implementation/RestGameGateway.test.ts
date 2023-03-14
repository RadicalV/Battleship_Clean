import { RestGameGateway } from "./RestGameGateway";
import { GameState } from "utils/Constants";
import { Board, Game, Ship, GameStats, ShotResult } from "domain/index";
import { mock } from "jest-mock-extended";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { of } from "rxjs";

describe("Rest game storage", () => {
  let restGameStorage: RestGameGateway;

  beforeEach(() => {
    restGameStorage = new RestGameGateway();
  });

  it("creates a game and returns it", (done) => {
    const expectedGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const id = "test";
    const game: Game = new Game(
      id,
      GameState.IN_PROGRESS,
      new Board(expectedGrid, [mock<Ship>()]),
      25,
      0
    );

    jest
      .spyOn(ajax, "post")
      .mockReturnValue(of({ response: game } as AjaxResponse<Game>));

    restGameStorage.startGame().subscribe((game) => {
      expect(game.board.grid).toEqual(expectedGrid);
      expect(game.state).toEqual(GameState.IN_PROGRESS);
      expect(game.hitsRemaining).toEqual(25);
      expect(game.shipsDestroyed).toEqual(0);
      done();
    });
  });

  it("finds and returns a game based on it's id", (done) => {
    const id = "test";
    const game: Game = new Game(
      id,
      GameState.IN_PROGRESS,
      mock<Board>(),
      25,
      0
    );

    jest
      .spyOn(ajax, "get")
      .mockReturnValue(of({ response: game } as AjaxResponse<Game>));

    restGameStorage.getGame(id).subscribe({
      next: (returnedGame) => {
        expect(returnedGame.id).toEqual(game.id);
        expect(returnedGame.state).toEqual(game.state);
        expect(returnedGame.board).toEqual(game.board);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult when miss", (done) => {
    const id = "123456";
    const coordinateX = 1;
    const coordinateY = 1;
    const expectedGrid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const shotResult: ShotResult = new ShotResult(
      expectedGrid,
      GameState.IN_PROGRESS,
      undefined
    );

    jest
      .spyOn(ajax, "post")
      .mockReturnValue(
        of({ response: shotResult } as AjaxResponse<ShotResult>)
      );

    restGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship).toBe(undefined);
        expect(shotResult.gameState).toEqual(GameState.IN_PROGRESS);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult with hit ship", (done) => {
    const id = "123456";
    const coordinateX = 0;
    const coordinateY = 1;
    const expectedGrid = [
      [0, 2, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const shotResult: ShotResult = new ShotResult(
      expectedGrid,
      GameState.IN_PROGRESS,
      new Ship(
        2,
        [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
        1,
        false
      )
    );

    jest
      .spyOn(ajax, "post")
      .mockReturnValue(
        of({ response: shotResult } as AjaxResponse<ShotResult>)
      );

    restGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship!.hits).toBe(1);
        expect(shotResult.ship!.destroyed).toBe(false);
        expect(shotResult.gameState).toEqual(GameState.IN_PROGRESS);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult with destroyed ship", (done) => {
    const id = "123456";
    const coordinateX = 1;
    const coordinateY = 1;
    const expectedGrid = [
      [0, 0, 0],
      [0, 3, 0],
      [0, 0, 0],
    ];
    const shotResult: ShotResult = new ShotResult(
      expectedGrid,
      GameState.IN_PROGRESS,
      new Ship(1, [{ x: 1, y: 1 }], 1, true)
    );

    jest
      .spyOn(ajax, "post")
      .mockReturnValue(
        of({ response: shotResult } as AjaxResponse<ShotResult>)
      );

    restGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship!.hits).toBe(1);
        expect(shotResult.ship!.destroyed).toBe(true);
        expect(shotResult.gameState).toEqual(GameState.IN_PROGRESS);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult with gameState WON", (done) => {
    const id = "123456";
    const coordinateX = 1;
    const coordinateY = 1;
    const expectedGrid = [
      [0, 0, 0],
      [0, 3, 0],
      [0, 0, 0],
    ];
    const shotResult: ShotResult = new ShotResult(
      expectedGrid,
      GameState.WON,
      new Ship(1, [{ x: 1, y: 1 }], 1, true)
    );

    jest
      .spyOn(ajax, "post")
      .mockReturnValue(
        of({ response: shotResult } as AjaxResponse<ShotResult>)
      );

    restGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship!.hits).toBe(1);
        expect(shotResult.ship!.destroyed).toBe(true);
        expect(shotResult.gameState).toEqual(GameState.WON);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult with gameState LOST", (done) => {
    const id = "123456";
    const coordinateX = 1;
    const coordinateY = 1;
    const expectedGrid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const shotResult: ShotResult = new ShotResult(
      expectedGrid,
      GameState.LOST,
      undefined
    );

    jest
      .spyOn(ajax, "post")
      .mockReturnValue(
        of({ response: shotResult } as AjaxResponse<ShotResult>)
      );

    restGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship).toBe(undefined);
        expect(shotResult.gameState).toEqual(GameState.LOST);
        done();
      },
    });
  });

  it("returns game stats", (done) => {
    const gameStats: GameStats = new GameStats(25, 0);

    jest
      .spyOn(ajax, "get")
      .mockReturnValue(of({ response: gameStats } as AjaxResponse<Game>));

    restGameStorage.getGameStats("123").subscribe({
      next: (gameStats) => {
        expect(gameStats.hitsRemaining).toBe(25);
        expect(gameStats.shipsDestroyed).toBe(0);
        done();
      },
    });
  });
});
