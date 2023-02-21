import ViewBoard from "./ViewBoard";

export default class ViewGame {
  readonly id: string;
  readonly isActive: boolean;
  readonly board: ViewBoard;

  constructor(id: string, isActive: boolean, board: ViewBoard) {
    this.id = id;
    this.isActive = isActive;
    this.board = board;
  }
}
