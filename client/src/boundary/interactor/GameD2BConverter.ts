import Game from "domain/Game";
import BoundaryGame from "boundary/model/BoundaryGame";
import { BoardD2BConverter } from "./BoardD2BConverter";

export class GameD2BConverter {
  private boardConverter: BoardD2BConverter;

  constructor(boardConverter: BoardD2BConverter) {
    this.boardConverter = boardConverter;
  }

  convert(game: Game): BoundaryGame {
    return new BoundaryGame(
      game.id,
      game.isActive,
      this.boardConverter.convert(game.board)
    );
  }
}
