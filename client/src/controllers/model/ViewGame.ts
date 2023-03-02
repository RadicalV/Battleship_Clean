import ViewBoard from "./ViewBoard";
import { GameState } from "utils/Constants";

export default class ViewGame {
  readonly id: string;
  readonly state: GameState;
  readonly board: ViewBoard;

  constructor(id: string, state: GameState, board: ViewBoard) {
    this.id = id;
    this.state = state;
    this.board = board;
  }
}
