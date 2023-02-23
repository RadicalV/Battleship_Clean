import { Game } from "domain/index";
import { Observable } from "rxjs";

export default interface GameStorage {
  getGame(id: string): Observable<Game>;
  startGame(): Observable<Game>;
}
