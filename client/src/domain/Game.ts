import Board from "./Board";

export default class Game {
  readonly id: string;
  readonly active: boolean;
  readonly board: Board;

  constructor(id: string, active: boolean, board: Board) {
    this.id = id;
    this.active = active;
    this.board = board;
  }
}
