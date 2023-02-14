import Game from "domain/Game";

export interface GetGameUseCase {
  getGame(id: string): Game;
}
