import BoundaryGame from "boundary/model/BoundaryGame";
import { Observable } from "rxjs";

export interface StartGameUC {
  startGame(): Observable<BoundaryGame>;
}
