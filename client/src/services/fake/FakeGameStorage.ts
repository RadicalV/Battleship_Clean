import GameStorage from "services/api/GameStorage";
import Game from "domain/Game";
import Board from "domain/Board";
import Ship from "domain/Ship";
import { Observable, of } from "rxjs";

export class FakeGameStorage implements GameStorage {
  getGame(id: string): Observable<Game> {
    const board = this.makeBoard();
    return of(new Game(id, true, board));
  }

  startGame(): Observable<Game> {
    return of(new Game("123", true, this.makeBoard()));
  }

  private makeBoard(): Board {
    const grid: number[][] = this.createGrid();
    const ships: Ship[] = [];
    return new Board(grid, ships);
  }

  private createGrid(): number[][] {
    return Array(10).fill(Array(10).fill(0));
  }
}
