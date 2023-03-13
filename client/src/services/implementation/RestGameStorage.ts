import { map, Observable } from "rxjs";
import GameStorage from "services/api/GameStorage";
import { Game, GameStats, ShotResult } from "domain/index";
import { ajax } from "rxjs/ajax";

export class RestGameStorage implements GameStorage {
  private readonly url: string;

  constructor() {
    this.url = "http://localhost:3000/games";
  }

  getGame(id: string): Observable<Game> {
    return ajax.get<Game>(this.url + "/" + id).pipe(map((t) => t.response));
  }

  getGameStats(gameId: string): Observable<GameStats> {
    return ajax
      .get<GameStats>(this.url + "/" + gameId + "/stats")
      .pipe(map((t) => t.response));
  }

  shoot(gameId: string, x: number, y: number): Observable<ShotResult> {
    return ajax
      .post<ShotResult>(this.url + "/" + gameId + "/shot", { x, y })
      .pipe(map((t) => t.response));
  }

  startGame(): Observable<Game> {
    return ajax.post<Game>(this.url).pipe(
      map((t) => {
        return t.response;
      })
    );
  }
}
