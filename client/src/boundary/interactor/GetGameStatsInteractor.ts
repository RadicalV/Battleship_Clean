import { GetGameStatsUC } from "boundary/api/GetGameStatsUC";
import { GameStatsD2BConverter } from "./GameStatsD2BConverter";
import { BoundaryGameStats } from "boundary/model/index";
import GameStorage from "services/api/GameStorage";
import { map, Observable } from "rxjs";

export class GetGameStatsInteractor implements GetGameStatsUC {
  private gameStorage: GameStorage;
  private gameConverter: GameStatsD2BConverter;

  constructor(gameStorage: GameStorage, gameConverter: GameStatsD2BConverter) {
    this.gameStorage = gameStorage;
    this.gameConverter = gameConverter;
  }

  getGameStats(id: string): Observable<BoundaryGameStats> {
    return this.gameStorage
      .getGameStats(id)
      .pipe(map((gameStats) => this.gameConverter.convert(gameStats)));
  }
}
