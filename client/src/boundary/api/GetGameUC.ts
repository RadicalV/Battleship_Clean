import BoundaryGame from "boundary/model/BoundaryGame";

export interface GetGameUC {
  getGame(id: string): BoundaryGame;
}
