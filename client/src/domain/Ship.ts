export default class Ship {
  readonly length: number;
  readonly coordinates: { x: number; y: number }[];
  readonly hits: number;
  readonly destroyed: boolean;

  constructor(
    length: number,
    coordinates: { x: number; y: number }[],
    hits: number
  ) {
    this.length = length;
    this.coordinates = coordinates;
    this.hits = hits;
    this.destroyed = false;
  }
}
