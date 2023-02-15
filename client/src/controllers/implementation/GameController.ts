import { GetGameInteractor } from "boundary/interactor/GetGameInteractor";
import { GameB2VConverter } from "./GameB2VConverter";

export class GameController {
  private getGameInteractor: GetGameInteractor;
  private gameConverter: GameB2VConverter;

  constructor(
    getGameInteractor: GetGameInteractor,
    gameConverter: GameB2VConverter
  ) {
    this.getGameInteractor = getGameInteractor;
    this.gameConverter = gameConverter;
  }

  getGame(id: string) {
    return this.gameConverter.convert(this.getGameInteractor.getGame(id));
  }
}
