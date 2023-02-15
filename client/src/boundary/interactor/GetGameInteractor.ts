import { GetGameUC } from "boundary/api/GetGameUC";
import GameStorage from "services/api/GameStorage";
import BoundaryGame from "boundary/model/BoundaryGame";
import { GameD2BConverter } from "./GameD2BConverter";

export class GetGameInteractor implements GetGameUC {
  private gameStorage: GameStorage;
  private gameConverter: GameD2BConverter;

  constructor(gameStorage: GameStorage, gameConverter: GameD2BConverter) {
    this.gameStorage = gameStorage;
    this.gameConverter = gameConverter;
  }

  getGame(id: string): BoundaryGame {
    return this.gameConverter.convert(this.gameStorage.getGame(id));
  }
}
