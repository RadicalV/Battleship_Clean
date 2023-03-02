import ViewShip from "./ViewShip";
import { GameState } from "utils/Constants";

export default class ViewShotResult {
  readonly grid: number[][];
  readonly gameState: GameState;
  readonly ship?: ViewShip;

  constructor(grid: number[][], gameState: GameState, ship?: ViewShip) {
    this.grid = grid;
    this.gameState = gameState;
    this.ship = ship;
  }
}
