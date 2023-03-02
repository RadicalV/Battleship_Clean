import GameStorage from "services/api/GameStorage";
import { Board, Game, GameStats, Ship, ShotResult } from "domain/index";
import { Observable, of } from "rxjs";
import { GameState } from "utils/Constants";

export class FakeGameStorage implements GameStorage {
  getGame(id: string): Observable<Game> {
    const board = this.makeBoard();
    return of(new Game(id, GameState.IN_PROGRESS, board, 25, 0));
  }

  startGame(): Observable<Game> {
    return of(new Game("123", GameState.IN_PROGRESS, this.makeBoard(), 25, 0));
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
    return of(new ShotResult([], GameState.IN_PROGRESS));
  }

  getGameStats(gameId: string): Observable<GameStats> {
    return of(new GameStats(25, 0));
  }
}
