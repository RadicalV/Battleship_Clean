import GameStorage from "services/api/GameStorage";
import { Game, Board, Ship } from "domain/index";
import {
  first,
  map,
  Observable,
  switchMap,
  throwError,
  of,
  Subject,
} from "rxjs";

export class InMemoryGameStorage implements GameStorage {
  private gameSubject$: Subject<Game[]>;

  constructor(gameSubject$: Subject<Game[]>) {
    this.gameSubject$ = gameSubject$;
  }

  getGame(id: string): Observable<Game> {
    return this.gameSubject$.pipe(
      first(),
      map((games) => games.find((g) => g.id === id)),
      switchMap((game) =>
        game !== undefined
          ? of(game)
          : throwError(() => new Error("Game not found"))
      )
    );
  }

  startGame(): Observable<Game> {
    const board = this.makeBoard();
    const gameId = this.generateRandomId();
    const game = new Game(gameId, true, board);

    return this.addGame(game);
  }

  private makeBoard(): Board {
    const grid: number[][] = this.createGrid();
    const ships: Ship[] = [];
    return new Board(grid, ships);
  }

  private createGrid(): number[][] {
    return Array(10).fill(Array(10).fill(0));
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2);
  }

  private addGame(game: Game): Observable<Game> {
    return this.gameSubject$.pipe(
      first(),
      map((games) => {
        const updatedGames = [...games];
        updatedGames.push(game);
        this.gameSubject$.next(updatedGames);
        return game;
      })
    );
  }
}
