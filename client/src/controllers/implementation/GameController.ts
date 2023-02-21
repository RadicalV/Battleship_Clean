import { GameB2VConverter } from "./GameB2VConverter";
import { GetGameUC } from "boundary/api/GetGameUC";
import { StartGameUC } from "boundary/api/StartGameUC";

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

  getGame(id: string) {
    return this.gameConverter.convert(this.getGameInteractor.getGame(id));
  }

  startGame() {
    return this.gameConverter.convert(this.startGameInteractor.startGame());
  }
}
