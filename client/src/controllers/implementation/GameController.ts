import { GameB2VConverter } from "./GameB2VConverter";
import { GetGameUC } from "boundary/api/GetGameUC";

export class GameController {
  private getGameInteractor: GetGameUC;
  private gameConverter: GameB2VConverter;

  constructor(getGameInteractor: GetGameUC, gameConverter: GameB2VConverter) {
    this.getGameInteractor = getGameInteractor;
    this.gameConverter = gameConverter;
  }

  getGame(id: string) {
    return this.gameConverter.convert(this.getGameInteractor.getGame(id));
  }
}
