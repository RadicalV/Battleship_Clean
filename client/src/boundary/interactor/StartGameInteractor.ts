import { StartGameUC } from "boundary/api/StartGameUC";
import { GameD2BConverter } from "./GameD2BConverter";
import GameStorage from "services/api/GameStorage";
import BoundaryGame from "boundary/model/BoundaryGame";
import { map, Observable } from "rxjs";

export class StartGameInteractor implements StartGameUC {
  private gameStorage: GameStorage;
  private gameConverter: GameD2BConverter;

  constructor(gameStorage: GameStorage, gameConverter: GameD2BConverter) {
    this.gameStorage = gameStorage;
    this.gameConverter = gameConverter;
  }

  startGame(): Observable<BoundaryGame> {
    return this.gameStorage
      .startGame()
      .pipe(map((game) => this.gameConverter.convert(game)));
  }
}
