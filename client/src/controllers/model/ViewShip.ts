export default class ViewShip {
  readonly coordinates: { x: number; y: number }[];
  readonly isDestroyed: boolean;

  constructor(coordinates: { x: number; y: number }[], isDestroyed: boolean) {
    this.coordinates = coordinates;
    this.isDestroyed = isDestroyed;
  }
}
