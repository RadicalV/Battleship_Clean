import Game from "domain/Game";
import Board from "domain/Board";

export default interface GameStorage {
  getGame(id: string): Game;
  getBoard(gameId: string): Board;
}
