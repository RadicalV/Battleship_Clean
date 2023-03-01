import Board from "./Board";

export default class Game {
  readonly id: string;
  readonly active: boolean;
  readonly board: Board;
  readonly hitsRemaining: number;
  readonly shipsDestroyed: number;

  constructor(
    id: string,
    active: boolean,
    board: Board,
    hitsRemaining: number,
    shipsDestroyed: number
  ) {
    this.id = id;
    this.active = active;
    this.board = board;
    this.hitsRemaining = hitsRemaining;
    this.shipsDestroyed = shipsDestroyed;
  }
}
