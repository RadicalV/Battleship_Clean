import { BoundaryGame } from "boundary/model/index";
import { ViewGame } from "controllers/model/index";
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
      game.state,
      this.boardConverter.convert(game.board)
    );
  }
}
