import { Observable } from "rxjs";
import { BoundaryShotResult } from "boundary/model";

export interface ShootUC {
  shoot(coordinates: { x: number; y: number }): Observable<BoundaryShotResult>;
}
