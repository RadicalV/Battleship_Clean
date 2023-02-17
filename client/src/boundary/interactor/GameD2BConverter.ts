import Game from "domain/Game";
import BoundaryGame from "boundary/model/BoundaryGame";

export class GameD2BConverter {
  convert(game: Game): BoundaryGame {
    return new BoundaryGame(game.id, game.isActive);
  }
}
