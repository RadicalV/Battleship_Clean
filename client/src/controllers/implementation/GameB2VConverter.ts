import BoundaryGame from "boundary/model/BoundaryGame";
import { ViewGame } from "controllers/model/ViewGame";

export class GameB2VConverter {
  convert(game: BoundaryGame): ViewGame {
    return new ViewGame(game.id, game.isActive);
  }
}
