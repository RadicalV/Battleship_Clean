import ViewShip from "./ViewShip";

export default class ViewShotResult {
  readonly grid: number[][];
  readonly ship?: ViewShip;

  constructor(grid: number[][], ship?: ViewShip) {
    this.grid = grid;
    this.ship = ship;
  }
}
