import GameStorage from "services/api/GameStorage";
import Game from "domain/Game";
import Board from "domain/Board";
import Ship from "domain/Ship";

export class FakeGameStorage implements GameStorage {
  getGame(id: string): Game {
    const board = this.makeBoard();
    return new Game(id, true, board);
  }

  private makeBoard(): Board {
    const grid: number[][] = this.createGrid();
    const ships: Ship[] = [];
    return new Board(grid, ships);
  }

  private createGrid(): number[][] {
    const grid: number[][] = [];

    for (let i = 0; i < 10; i++) {
      grid[i] = [10];
      for (let j = 0; j < 10; j++) {
        grid[i][j] = 0;
      }
    }
    return grid;
  }

  getBoard(gameId: string): Board {
    return this.getGame(gameId).board;
  }
}
