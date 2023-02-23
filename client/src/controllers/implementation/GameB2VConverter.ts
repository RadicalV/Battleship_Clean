import BoundaryGame from "boundary/model/BoundaryGame";
import ViewGame from "controllers/model/ViewGame";
import { Converter } from "utils/Converter";
import { BoardB2VConverter } from "./BoardB2VConverter";

export class GameB2VConverter extends Converter<BoundaryGame, ViewGame> {
  private boardConverter: BoardB2VConverter;

  constructor(boardConverter: BoardB2VConverter) {
    super();
    this.boardConverter = boardConverter;
  }

  convert(game: BoundaryGame): ViewGame {
    return new ViewGame(
      game.id,
      game.active,
      this.boardConverter.convert(game.board)
    );
  }
}
