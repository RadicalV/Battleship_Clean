import Game from "domain/Game";
import BoundaryGame from "boundary/model/BoundaryGame";
import Board from "domain/Board";
import BoundaryBoard from "boundary/model/BoundaryBoard";

export class GameD2BConverter {
  convert(game: Game): BoundaryGame {
    return new BoundaryGame(game.id, game.isActive);
  }

  convertBoard(board: Board): BoundaryBoard {
    return new BoundaryBoard(board.grid, board.ships);
  }
}
