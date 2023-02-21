import BoundaryShip from "./BoundaryShip";

export default class BoundaryBoard {
  readonly grid: number[][];
  readonly ships: BoundaryShip[];

  constructor(grid: number[][], ships: BoundaryShip[]) {
    this.grid = grid;
    this.ships = ships;
  }
}
