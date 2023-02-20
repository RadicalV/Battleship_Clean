import { GetBoardUC } from "boundary/api/GetBoardUC";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import GameStorage from "services/api/GameStorage";
import { GameD2BConverter } from "./GameD2BConverter";

export class GetBoardInteractor implements GetBoardUC {
  private gameStorage: GameStorage;
  private gameConverter: GameD2BConverter;

  constructor(gameStorage: GameStorage, gameConverter: GameD2BConverter) {
    this.gameStorage = gameStorage;
    this.gameConverter = gameConverter;
  }

  getBoard(gameId: string): BoundaryBoard {
    return this.gameConverter.convertBoard(this.gameStorage.getBoard(gameId));
  }
}
