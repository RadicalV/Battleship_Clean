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
    return Array(10).fill(Array(10).fill(0));
  }

  getBoard(gameId: string): Board {
    return this.getGame(gameId).board;
  }
}
