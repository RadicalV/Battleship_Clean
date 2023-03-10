import GameStorage from "services/api/GameStorage";
import { ShotResult, Ship } from "domain/index";
import { BoundaryShotResult, BoundaryShip } from "boundary/model/index";
import { ShotResultD2BConverter } from "./ShotResultD2BConverter";
import { ShootInteractor } from "./ShootInteractor";
import { mock, MockProxy } from "jest-mock-extended";
import { of } from "rxjs";
import { GameState } from "utils/Constants";

describe("Shoot Interactor", () => {
  let gameStorage: MockProxy<GameStorage>;
  let shotResultD2BConverter: MockProxy<ShotResultD2BConverter>;
  let shootInteractor: ShootInteractor;

  beforeEach(() => {
    gameStorage = mock<GameStorage>();
    shotResultD2BConverter = mock<ShotResultD2BConverter>();
    shootInteractor = new ShootInteractor(gameStorage, shotResultD2BConverter);
  });

  it("returns shotResult", (done) => {
    const expectedShotResult: ShotResult = new ShotResult(
      [[0, 1, 0, 0]],
      GameState.IN_PROGRESS,
      mock<Ship>()
    );
    const expectedBoundaryShotResult: BoundaryShotResult =
      new BoundaryShotResult(
        [[0, 1, 0, 0]],
        GameState.IN_PROGRESS,
        mock<BoundaryShip>()
      );
    const coordinateX = 0;
    const coordinateY = 1;
    const gameId = "123";

    gameStorage.shoot
      .calledWith(gameId, coordinateX, coordinateY)
      .mockReturnValue(of(expectedShotResult));
    shotResultD2BConverter.convert
      .calledWith(expectedShotResult)
      .mockReturnValue(expectedBoundaryShotResult);

    shootInteractor.shoot(gameId, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult).toStrictEqual(expectedBoundaryShotResult);
        done();
      },
    });
  });
});
