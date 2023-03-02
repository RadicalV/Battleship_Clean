import GameStorage from "services/api/GameStorage";
import { Game, Board, Ship, ShotResult, GameStats } from "domain/index";
import { Observable, of } from "rxjs";
import { IN_PROGRESS } from "utils/Constants";

export class FakeGameStorage implements GameStorage {
  getGame(id: string): Observable<Game> {
    const board = this.makeBoard();
    return of(new Game(id, IN_PROGRESS, board, 25, 0));
  }

  startGame(): Observable<Game> {
    return of(new Game("123", IN_PROGRESS, this.makeBoard(), 25, 0));
  }

  private makeBoard(): Board {
    const grid: number[][] = this.createGrid();
    const ships: Ship[] = [];
    return new Board(grid, ships);
  }

  private createGrid(): number[][] {
    return Array(10).fill(Array(10).fill(0));
  }

  shoot(gameId: string, x: number, y: number): Observable<ShotResult> {
    return of(new ShotResult([]));
  }

  getGameStats(gameId: string): Observable<GameStats> {
    return of(new GameStats(25, 0));
  }
}
