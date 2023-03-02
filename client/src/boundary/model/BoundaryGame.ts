import BoundaryBoard from "./BoundaryBoard";

export default class BoundaryGame {
  readonly id: string;
  readonly state: string;
  readonly board: BoundaryBoard;

  constructor(id: string, state: string, board: BoundaryBoard) {
    this.id = id;
    this.state = state;
    this.board = board;
  }
}
