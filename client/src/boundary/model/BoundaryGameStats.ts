export default class BoundaryGameStats {
  readonly hitsRemaining: number;
  readonly shipsDestroyed: number;

  constructor(hitsRemaining: number, shipsDestroyed: number) {
    this.hitsRemaining = hitsRemaining;
    this.shipsDestroyed = shipsDestroyed;
  }
}
