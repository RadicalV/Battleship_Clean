import { Game, GameStats, ShotResult } from "domain/index";
import { Observable } from "rxjs";

export default interface GameStorage {
  getGame(id: string): Observable<Game>;
  startGame(): Observable<Game>;
  shoot(gameId: string, x: number, y: number): Observable<ShotResult>;
  getGameStats(gameId: string): Observable<GameStats>;
}
