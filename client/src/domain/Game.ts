import Board from "./Board";

export default class Game {
  readonly id: string;
  readonly isActive: boolean;
  readonly board: Board;

  constructor(id: string, isActive: boolean, board: Board) {
    this.id = id;
    this.isActive = isActive;
    this.board = board;
  }
}
