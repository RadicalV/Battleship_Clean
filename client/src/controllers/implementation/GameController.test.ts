import { mock, MockProxy } from "jest-mock-extended";
import { GetGameUC } from "boundary/api/GetGameUC";
import { StartGameUC } from "boundary/api/StartGameUC";
import { ShootUC } from "boundary/api/ShootUC";
import {
  BoardB2VConverter,
  GameB2VConverter,
  GameController,
  ShotResultB2VConverter,
} from "./index";
import {
  BoundaryBoard,
  BoundaryGame,
  BoundaryShip,
  BoundaryShotResult,
} from "boundary/model/index";
import {
  ViewBoard,
  ViewGame,
  ViewShip,
  ViewShotResult,
} from "controllers/model/index";
import { of } from "rxjs";
import { GameState } from "utils/Constants";

describe("Game Controller", () => {
  let getGameUC: MockProxy<GetGameUC>;
  let startGameUC: MockProxy<StartGameUC>;
  let shootUC: MockProxy<ShootUC>;
  let gameConverter: MockProxy<GameB2VConverter>;
  let boardConverter: MockProxy<BoardB2VConverter>;
  let shotResultConverter: MockProxy<ShotResultB2VConverter>;
  let gameController: GameController;

  const inputId = "123";
  const expectedBoundaryGame = new BoundaryGame(
    inputId,
    GameState.IN_PROGRESS,
    mock<BoundaryBoard>()
  );
  const expectedViewGame = new ViewGame(
    inputId,
    GameState.IN_PROGRESS,
    mock<ViewBoard>()
  );

  beforeEach(() => {
    getGameUC = mock<GetGameUC>();
    startGameUC = mock<StartGameUC>();
    shootUC = mock<ShootUC>();
    gameConverter = mock<GameB2VConverter>();
    boardConverter = mock<BoardB2VConverter>();
    shotResultConverter = mock<ShotResultB2VConverter>();
    gameController = new GameController(
      getGameUC,
      startGameUC,
      shootUC,
      gameConverter,
      shotResultConverter
    );

    gameConverter.convert
      .calledWith(expectedBoundaryGame)
      .mockReturnValue(expectedViewGame);
  });

  it("finds game and returns it", (done) => {
    getGameUC.getGame
      .calledWith(inputId)
      .mockReturnValue(of(expectedBoundaryGame));

    gameController.getGame(inputId).subscribe({
      next: (game) => {
        expect(game.id).toEqual(expectedViewGame.id);
        expect(game.state).toEqual(expectedViewGame.state);
        expect(game.board).toEqual(expectedViewGame.board);
        done();
      },
      error: (error) => done(error),
    });
  });

  it("creates a game and returns it", (done) => {
    startGameUC.startGame.mockReturnValue(of(expectedBoundaryGame));

    gameController.startGame().subscribe({
      next: (game) => {
        expect(game.id).toEqual(expectedViewGame.id);
        expect(game.state).toEqual(expectedViewGame.state);
        expect(game.board).toEqual(expectedViewGame.board);
        done();
      },
    });
  });

  it("returns a grid with value 1 at shot position and undefined ship", (done) => {
    const coordinateX = 1;
    const coordinateY = 1;

    const expectedBoundaryShotResult = new BoundaryShotResult(
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      GameState.IN_PROGRESS,
      undefined
    );
    const expectedViewShotResult = new ViewShotResult(
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      GameState.IN_PROGRESS,
      undefined
    );

    shootUC.shoot
      .calledWith(inputId, coordinateX, coordinateY)
      .mockReturnValue(of(expectedBoundaryShotResult));

    shotResultConverter.convert
      .calledWith(expectedBoundaryShotResult)
      .mockReturnValue(expectedViewShotResult);

    gameController.shoot(inputId, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedViewShotResult.grid);
        expect(shotResult.ship).toEqual(expectedViewShotResult.ship);
        done();
      },
    });
  });

  it("returns a grid with value 2 at shot position and hit ship", (done) => {
    const coordinateX = 1;
    const coordinateY = 1;

    const expectedBoundaryShotResult = new BoundaryShotResult(
      [
        [0, 0, 0],
        [0, 2, 0],
        [0, 0, 0],
      ],
      GameState.IN_PROGRESS,
      new BoundaryShip(
        2,
        [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
        ],
        1,
        false
      )
    );
    const expectedViewShotResult = new ViewShotResult(
      [
        [0, 0, 0],
        [0, 2, 0],
        [0, 0, 0],
      ],
      GameState.IN_PROGRESS,
      new ViewShip(
        [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
        ],
        false
      )
    );

    shootUC.shoot
      .calledWith(inputId, coordinateX, coordinateY)
      .mockReturnValue(of(expectedBoundaryShotResult));

    shotResultConverter.convert
      .calledWith(expectedBoundaryShotResult)
      .mockReturnValue(expectedViewShotResult);

    gameController.shoot(inputId, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedViewShotResult.grid);
        expect(shotResult.ship!.coordinates).toEqual(
          expectedViewShotResult.ship!.coordinates
        );
        expect(shotResult.ship!.destroyed).toEqual(
          expectedViewShotResult.ship!.destroyed
        );
        done();
      },
    });
  });
});
