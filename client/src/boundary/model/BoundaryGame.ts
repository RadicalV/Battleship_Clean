import BoundaryBoard from "./BoundaryBoard";

export default class BoundaryGame {
  readonly id: string;
  readonly isActive: boolean;
  readonly board: BoundaryBoard;

  constructor(id: string, isActive: boolean, board: BoundaryBoard) {
    this.id = id;
    this.isActive = isActive;
    this.board = board;
  }
}
