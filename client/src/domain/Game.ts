import Board from "./Board";
import { GameState } from "utils/Constants";

export default class Game {
  readonly id: string;
  readonly state: GameState;
  readonly board: Board;
  readonly hitsRemaining: number;
  readonly shipsDestroyed: number;

  constructor(
    id: string,
    state: GameState,
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
