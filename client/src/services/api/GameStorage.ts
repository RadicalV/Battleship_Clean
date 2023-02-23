import Game from "domain/Game";
import { Observable } from "rxjs";

export default interface GameStorage {
  getGame(id: string): Observable<Game>;
  startGame(): Observable<Game>;
}
