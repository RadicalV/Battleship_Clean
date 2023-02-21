import BoundaryBoard from "boundary/model/BoundaryBoard";

export interface GetBoardUC {
  getBoard(gameId: string): BoundaryBoard;
}
