import { GameB2VConverter } from "./GameB2VConverter";
import { GetGameUC } from "boundary/api/GetGameUC";
import { StartGameUC } from "boundary/api/StartGameUC";
import { map, Observable } from "rxjs";
import { ViewGame } from "controllers/model/index";
import { ViewShotResult } from "controllers/model/";
import { ShootUC } from "boundary/api/ShootUC";
import { ShotResultB2VConverter } from "./ShotResultB2VConverter";

export class GameController {
  private getGameInteractor: GetGameUC;
  private startGameInteractor: StartGameUC;
  private shootInteractor: ShootUC;
  private gameConverter: GameB2VConverter;
  private shotResultConverter: ShotResultB2VConverter;

  constructor(
    getGameInteractor: GetGameUC,
    startGameInteractor: StartGameUC,
    shootInteractor: ShootUC,
    gameConverter: GameB2VConverter,
    shotResultConverter: ShotResultB2VConverter
  ) {
    this.getGameInteractor = getGameInteractor;
    this.startGameInteractor = startGameInteractor;
    this.gameConverter = gameConverter;
    this.shotResultConverter = shotResultConverter;
    this.shootInteractor = shootInteractor;
  }

  getGame(id: string): Observable<ViewGame> {
    return this.getGameInteractor
      .getGame(id)
      .pipe(map((game) => this.gameConverter.convert(game)));
  }

  startGame(): Observable<ViewGame> {
    return this.startGameInteractor
      .startGame()
      .pipe(map((game) => this.gameConverter.convert(game)));
  }

  shoot(gameId: string, x: number, y: number): Observable<ViewShotResult> {
    return this.shootInteractor
      .shoot(gameId, x, y)
      .pipe(map((shotResult) => this.shotResultConverter.convert(shotResult)));
  }
}
