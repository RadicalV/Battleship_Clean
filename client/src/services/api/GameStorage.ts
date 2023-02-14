import Game from "domain/Game";

export default interface GameStorage {
  getGame(id: string): Game;
}
