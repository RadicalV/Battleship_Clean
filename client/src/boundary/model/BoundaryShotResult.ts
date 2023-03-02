import BoundaryShip from "./BoundaryShip";
import { GameState } from "utils/Constants";

export default class BoundaryShotResult {
  readonly grid: number[][];
  readonly gameState: GameState;
  readonly ship?: BoundaryShip;

  constructor(grid: number[][], gameState: GameState, ship?: BoundaryShip) {
    this.grid = grid;
    this.gameState = gameState;
    this.ship = ship;
  }
}
