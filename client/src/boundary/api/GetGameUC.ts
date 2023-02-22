import BoundaryGame from "boundary/model/BoundaryGame";
import { Observable } from "rxjs";

export interface GetGameUC {
  getGame(id: string): Observable<BoundaryGame>;
}
