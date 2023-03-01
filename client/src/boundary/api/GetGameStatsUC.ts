import { Observable } from "rxjs";
import { BoundaryGameStats } from "boundary/model/index";

export interface GetGameStatsUC {
  getGameStats(id: string): Observable<BoundaryGameStats>;
}
