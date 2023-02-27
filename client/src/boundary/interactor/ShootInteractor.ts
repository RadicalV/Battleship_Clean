import { ShootUC } from "boundary/api/ShootUC";
import GameStorage from "services/api/GameStorage";
import { ShotResultD2BConverter } from "./ShotResultD2BConverter";
import { BoundaryShotResult } from "boundary/model";
import { map, Observable } from "rxjs";

export class ShootInteractor implements ShootUC {
  private gameStorage: GameStorage;
  private shotResultConverter: ShotResultD2BConverter;

  constructor(
    gameStorage: GameStorage,
    shotResultConverter: ShotResultD2BConverter
  ) {
    this.gameStorage = gameStorage;
    this.shotResultConverter = shotResultConverter;
  }

  shoot(gameId: string, x: number, y: number): Observable<BoundaryShotResult> {
    return this.gameStorage
      .shoot(gameId, x, y)
      .pipe(map((shotResult) => this.shotResultConverter.convert(shotResult)));
  }
}
