import BoundaryBoard from "./BoundaryBoard";
import { GameState } from "utils/Constants";

export default class BoundaryGame {
  readonly id: string;
  readonly state: GameState;
  readonly board: BoundaryBoard;

  constructor(id: string, state: GameState, board: BoundaryBoard) {
    this.id = id;
    this.state = state;
    this.board = board;
  }
}
