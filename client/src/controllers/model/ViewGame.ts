import ViewBoard from "./ViewBoard";

export default class ViewGame {
  readonly id: string;
  readonly active: boolean;
  readonly board: ViewBoard;

  constructor(id: string, active: boolean, board: ViewBoard) {
    this.id = id;
    this.active = active;
    this.board = board;
  }
}
