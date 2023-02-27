import { Ship } from "./index";

export default class ShotResult {
  readonly grid: number[][];
  readonly ship?: Ship;

  constructor(grid: number[][], ship?: Ship) {
    this.grid = grid;
    this.ship = ship;
  }
}
