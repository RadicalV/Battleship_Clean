import { GetGameStatsUC } from "boundary/api/GetGameStatsUC";
import { GameStatsB2VConverter } from "./GameStatsB2VConverter";
import { ViewGameStats } from "controllers/model/index";
import { map, Observable } from "rxjs";

export class GameStatsController {
  private getGameStatsInteractor: GetGameStatsUC;
  private gameStatsConverter: GameStatsB2VConverter;

  constructor(
    getGameStatsInteractor: GetGameStatsUC,
    gameStatsConverter: GameStatsB2VConverter
  ) {
    this.getGameStatsInteractor = getGameStatsInteractor;
    this.gameStatsConverter = gameStatsConverter;
  }

  getGameStats(gameId: string): Observable<ViewGameStats> {
    return this.getGameStatsInteractor
      .getGameStats(gameId)
      .pipe(map((gameStats) => this.gameStatsConverter.convert(gameStats)));
  }
}
