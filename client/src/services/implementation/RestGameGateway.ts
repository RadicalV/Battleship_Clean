import { map, Observable } from "rxjs";
import GameStorage from "services/api/GameStorage";
import { Game, GameStats, ShotResult } from "domain/index";
import { ajax, AjaxResponse } from "rxjs/ajax";

export class RestGameGateway implements GameStorage {
  private readonly url: string;

  constructor() {
    this.url = "http://10.0.1.5:3000/games";
  }

  getGame(id: string): Observable<Game> {
    return this.extractResponse(ajax.get<Game>(this.url + "/" + id));
  }

  getGameStats(gameId: string): Observable<GameStats> {
    return this.extractResponse(
      ajax.get<GameStats>(this.url + "/" + gameId + "/stats")
    );
  }

  shoot(gameId: string, x: number, y: number): Observable<ShotResult> {
    return this.extractResponse(
      ajax.post<ShotResult>(this.url + "/" + gameId + "/shot", { x, y })
    );
  }

  startGame(): Observable<Game> {
    return this.extractResponse(ajax.post<Game>(this.url));
  }

  extractResponse(
    ajaxResponse$: Observable<AjaxResponse<any>>
  ): Observable<any> {
    return ajaxResponse$.pipe(map((r) => r.response));
  }
}
