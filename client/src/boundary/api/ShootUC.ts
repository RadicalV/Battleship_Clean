import { Observable } from "rxjs";
import { BoundaryShotResult } from "boundary/model";

export interface ShootUC {
  shoot(gameId: string, x: number, y: number): Observable<BoundaryShotResult>;
}
