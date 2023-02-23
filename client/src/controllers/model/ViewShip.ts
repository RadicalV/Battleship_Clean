export default class ViewShip {
  readonly coordinates: { x: number; y: number }[];
  readonly destroyed: boolean;

  constructor(coordinates: { x: number; y: number }[], destroyed: boolean) {
    this.coordinates = coordinates;
    this.destroyed = destroyed;
  }
}
