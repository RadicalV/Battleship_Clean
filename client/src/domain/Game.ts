export default class Game {
  readonly id: string;
  readonly isActive: boolean;

  constructor(id: string, isActive: boolean) {
    this.id = id;
    this.isActive = isActive;
  }
}
