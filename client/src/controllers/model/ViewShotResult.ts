import ViewShip from "./ViewShip";

export default class ViewShotResult {
  readonly grid: number[][];
  readonly gameState: string;
  readonly ship?: ViewShip;

  constructor(grid: number[][], gameState: string, ship?: ViewShip) {
    this.grid = grid;
    this.gameState = gameState;
    this.ship = ship;
  }
}
