import { GetGameUseCase } from "boundary/api/GetGameUseCase";
import Game from "domain/Game";
import GameStorage from "services/api/GameStorage";

export class GetGameInteractor implements GetGameUseCase {
  private gameStorage: GameStorage;

  constructor(gameStorage: GameStorage) {
    this.gameStorage = gameStorage;
  }

  getGame(id: string): Game {
    return this.gameStorage.getGame(id);
  }
}
