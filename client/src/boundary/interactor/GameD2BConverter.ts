import { Game } from "domain/index";
import { BoundaryGame } from "boundary/model/index";
import { Converter } from "utils/Converter";
import { BoardD2BConverter } from "./BoardD2BConverter";

export class GameD2BConverter extends Converter<Game, BoundaryGame> {
  private boardConverter: BoardD2BConverter;

  constructor(boardConverter: BoardD2BConverter) {
    super();
    this.boardConverter = boardConverter;
  }

  convert(game: Game): BoundaryGame {
    return new BoundaryGame(
      game.id,
      game.active,
      this.boardConverter.convert(game.board)
    );
  }
}
