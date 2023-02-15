import GameStorage from "services/api/GameStorage";
import Game from "domain/Game";

export class FakeGameStorage implements GameStorage {
  getGame(id: string): Game {
    return new Game(id, true);
  }
}
