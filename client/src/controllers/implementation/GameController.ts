import { GameB2VConverter } from "./GameB2VConverter";
import { GetGameUC } from "boundary/api/GetGameUC";
import { StartGameUC } from "boundary/api/StartGameUC";
import { map, Observable } from "rxjs";
import ViewGame from "../model/ViewGame";

export class GameController {
  private getGameInteractor: GetGameUC;
  private startGameInteractor: StartGameUC;
  private gameConverter: GameB2VConverter;

  constructor(
    getGameInteractor: GetGameUC,
    startGameInteractor: StartGameUC,
    gameConverter: GameB2VConverter
  ) {
    this.getGameInteractor = getGameInteractor;
    this.startGameInteractor = startGameInteractor;
    this.gameConverter = gameConverter;
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
}
