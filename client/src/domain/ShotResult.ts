import { Ship } from "./index";
import { GameState } from "utils/Constants";

export default class ShotResult {
  readonly grid: number[][];
  readonly ship?: Ship;
  readonly gameState: GameState;

  constructor(grid: number[][], gameState: GameState, ship?: Ship) {
    this.grid = grid;
    this.ship = ship;
    this.gameState = gameState;
  }
}
