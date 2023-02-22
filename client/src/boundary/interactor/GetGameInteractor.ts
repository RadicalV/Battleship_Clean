import { GetGameUC } from "boundary/api/GetGameUC";
import GameStorage from "services/api/GameStorage";
import BoundaryGame from "boundary/model/BoundaryGame";
import { GameD2BConverter } from "./GameD2BConverter";
import { map, Observable } from "rxjs";

export class GetGameInteractor implements GetGameUC {
  private gameStorage: GameStorage;
  private gameConverter: GameD2BConverter;

  constructor(gameStorage: GameStorage, gameConverter: GameD2BConverter) {
    this.gameStorage = gameStorage;
    this.gameConverter = gameConverter;
  }

  getGame(id: string): Observable<BoundaryGame> {
    return this.gameStorage
      .getGame(id)
      .pipe(map((game) => this.gameConverter.convert(game)));
  }
}
