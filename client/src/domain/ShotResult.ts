import { Ship } from "./index";

export default class ShotResult {
  readonly grid: number[][];
  readonly ship?: Ship;
  readonly gameState: string;

  constructor(grid: number[][], gameState: string, ship?: Ship) {
    this.grid = grid;
    this.ship = ship;
    this.gameState = gameState;
  }
}
