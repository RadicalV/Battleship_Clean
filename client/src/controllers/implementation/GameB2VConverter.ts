import BoundaryGame from "boundary/model/BoundaryGame";
import { ViewGame } from "controllers/model/ViewGame";
import { Converter } from "utils/Converter";

export class GameB2VConverter extends Converter<BoundaryGame, ViewGame> {
  convert(game: BoundaryGame): ViewGame {
    return new ViewGame(game.id, game.isActive);
  }
}
