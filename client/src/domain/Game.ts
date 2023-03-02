import Board from "./Board";

export default class Game {
  readonly id: string;
  readonly state: string;
  readonly board: Board;
  readonly hitsRemaining: number;
  readonly shipsDestroyed: number;

  constructor(
    id: string,
    state: string,
    board: Board,
    hitsRemaining: number,
    shipsDestroyed: number
  ) {
    this.id = id;
    this.state = state;
    this.board = board;
    this.hitsRemaining = hitsRemaining;
    this.shipsDestroyed = shipsDestroyed;
  }
}
