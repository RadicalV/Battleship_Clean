import ViewBoard from "./ViewBoard";

export default class ViewGame {
  readonly id: string;
  readonly state: string;
  readonly board: ViewBoard;

  constructor(id: string, state: string, board: ViewBoard) {
    this.id = id;
    this.state = state;
    this.board = board;
  }
}
