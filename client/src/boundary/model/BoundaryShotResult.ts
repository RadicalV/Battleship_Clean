import BoundaryShip from "./BoundaryShip";

export default class BoundaryShotResult {
  readonly grid: number[][];
  readonly ship?: BoundaryShip;

  constructor(grid: number[][], ship?: BoundaryShip) {
    this.grid = grid;
    this.ship = ship;
  }
}
