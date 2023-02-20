import Ship from "./Ship";

export default class Board {
  readonly grid: number[][];
  readonly ships: Ship[];

  constructor(grid: number[][], ships: Ship[]) {
    this.grid = grid;
    this.ships = ships;
  }
}
