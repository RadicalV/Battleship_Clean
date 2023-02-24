import { Game } from "domain/index";
import { Observable } from "rxjs";
import { ShotResult } from "domain/index";

export default interface GameStorage {
  getGame(id: string): Observable<Game>;
  startGame(): Observable<Game>;
  shoot(coordinates: { x: number; y: number }): Observable<ShotResult>;
}
