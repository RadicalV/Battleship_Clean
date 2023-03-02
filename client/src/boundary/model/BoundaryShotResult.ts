import BoundaryShip from "./BoundaryShip";

export default class BoundaryShotResult {
  readonly grid: number[][];
  readonly gameState: string;
  readonly ship?: BoundaryShip;

  constructor(grid: number[][], gameState: string, ship?: BoundaryShip) {
    this.grid = grid;
    this.gameState = gameState;
    this.ship = ship;
  }
}
