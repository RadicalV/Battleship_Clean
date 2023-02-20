import { GetBoardUC } from "boundary/api/GetBoardUC";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import GameStorage from "services/api/GameStorage";
import { BoardD2BConverter } from "./BoardD2BConverter";

// Up for deletion if the changes to boundaryGame model and converters are good

export class GetBoardInteractor implements GetBoardUC {
  private gameStorage: GameStorage;
  private gameConverter: BoardD2BConverter;

  constructor(gameStorage: GameStorage, gameConverter: BoardD2BConverter) {
    this.gameStorage = gameStorage;
    this.gameConverter = gameConverter;
  }

  getBoard(gameId: string): BoundaryBoard {
    return this.gameConverter.convert(this.gameStorage.getBoard(gameId));
  }
}
