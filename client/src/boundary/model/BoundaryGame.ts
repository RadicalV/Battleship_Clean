import BoundaryBoard from "./BoundaryBoard";

export default class BoundaryGame {
  readonly id: string;
  readonly active: boolean;
  readonly board: BoundaryBoard;

  constructor(id: string, active: boolean, board: BoundaryBoard) {
    this.id = id;
    this.active = active;
    this.board = board;
  }
}
